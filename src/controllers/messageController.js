const Message = require('../models/Message');
const User = require('../models/User');

// GET /messages - получить все сообщения
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// GET /messages/:id - получить сообщение по ID
const getMessageById = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    // Проверка доступа к сообщению
    if (message.senderId !== req.user.id && message.receiverId !== req.user.id && req.user.role !== 'admin') {
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
    
    if (!senderId || !receiverId || !content) {
      return res.status(400).json({ error: 'SenderId, receiverId and content are required' });
    }
    
    // Проверка существования пользователей
    const senderExists = await User.findByPk(senderId);
    if (!senderExists) {
      return res.status(400).json({ error: 'Sender not found' });
    }
    
    const receiverExists = await User.findByPk(receiverId);
    if (!receiverExists) {
      return res.status(400).json({ error: 'Receiver not found' });
    }
    
    // Проверка доступа к отправке сообщения
    if (senderId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not message sender.' });
    }
    
    const message = await Message.create(req.body);
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
    
    // Проверка доступа к сообщению
    if (message.senderId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not message sender.' });
    }
    
    await message.update(req.body);
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
    
    // Проверка доступа к сообщению
    if (message.senderId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not message sender.' });
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
    const messages = await Message.findAll({
      where: { 
        $or: [
          { senderId: req.params.userId },
          { receiverId: req.params.userId }
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
    res.status(500).json({ error: 'Failed to fetch messages for user' });
  }
};

// GET /messages/conversation/:senderId/:receiverId - получить диалог между пользователями
const getConversation = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { 
        $and: [
          { senderId: req.params.senderId },
          { receiverId: req.params.receiverId }
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
    
    // Проверка доступа к сообщению
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