const Message = require('../models/Message');
const User = require('../models/User');
const { Op } = require('sequelize');

// GET /messages - получить все сообщения (для владельца или админа)
const getAllMessages = async (req, res) => {
  try {
    let messages;
    if (req.user.role === 'admin') {
      // Администратор видит все сообщения
      messages = await Message.findAll({
        include: [
          { model: User, as: 'sender' },
          { model: User, as: 'receiver' }
        ]
      });
    } else {
      // Пользователь видит только свои сообщения
      messages = await Message.findAll({
        where: {
          [Op.or]: [
            { senderId: req.user.id },
            { receiverId: req.user.id }
          ]
        },
        include: [
          { model: User, as: 'sender' },
          { model: User, as: 'receiver' }
        ]
      });
    }
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// GET /messages/:id - получить сообщение по ID
const getMessageById = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id, {
      include: [
        { model: User, as: 'sender' },
        { model: User, as: 'receiver' }
      ]
    });
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    // Проверка прав доступа
    if (message.senderId !== req.user.id && 
        message.receiverId !== req.user.id && 
        req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not message sender or receiver.' });
    }
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch message' });
  }
};

// POST /messages - создать новое сообщение
const createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    
    // Проверка прав доступа - только отправитель может создавать сообщения
    if (senderId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not message sender.' });
    }
    
    // Проверка существования получателя
    const receiver = await User.findByPk(receiverId);
    if (!receiver) {
      return res.status(400).json({ error: 'Receiver not found' });
    }
    
    const message = await Message.create({
      senderId,
      receiverId,
      content
    });
    
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create message', details: error.message });
  }
};

// PUT /messages/:id - обновить сообщение
const updateMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    // Проверка прав доступа - только отправитель может обновлять сообщения
    if (message.senderId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not message sender.' });
    }
    
    // Защита от массового присвоения полей
    const { content, isRead } = req.body;
    const updateData = {};
    
    if (content !== undefined) updateData.content = content;
    if (isRead !== undefined) updateData.isRead = isRead;
    
    await message.update(updateData);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update message', details: error.message });
  }
};

// DELETE /messages/:id - удалить сообщение
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    // Проверка прав доступа - только отправитель или получатель могут удалять
    if (message.senderId !== req.user.id && 
        message.receiverId !== req.user.id && 
        req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not message sender or receiver.' });
    }
    
    await message.destroy();
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

// GET /messages/user/:userId - получить все сообщения пользователя
const getMessagesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Проверка прав доступа - пользователь может видеть только свои сообщения или админ
    if (userId !== req.user.id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not your messages.' });
    }
    
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: [
        { model: User, as: 'sender' },
        { model: User, as: 'receiver' }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user messages' });
  }
};

// GET /messages/conversation/:senderId/:receiverId - получить диалог между пользователями
const getConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    
    // Проверка прав доступа - только участники диалога или админ могут видеть сообщения
    const isSender = senderId === req.user.id.toString();
    const isReceiver = receiverId === req.user.id.toString();
    
    if (!isSender && !isReceiver && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not participant in conversation.' });
    }
    
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId }
        ]
      },
      include: [
        { model: User, as: 'sender' },
        { model: User, as: 'receiver' }
      ],
      order: [['createdAt', 'ASC']]
    });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
};

// PUT /messages/:id/read - отметить сообщение как прочитанное
const markAsRead = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    // Проверка прав доступа - только получатель может отметить как прочитанное
    if (message.receiverId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not message receiver.' });
    }
    
    await message.update({ isRead: true });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark message as read' });
  }
};

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
  getMessagesByUser,
  getConversation,
  markAsRead
};