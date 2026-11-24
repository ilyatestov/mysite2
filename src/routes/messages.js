const express = require('express');
const router = express.Router();
const { getAllMessages, getMessageById, createMessage, updateMessage, deleteMessage, getMessagesByUser, getConversation, markAsRead } = require('../controllers/messageController');
const { validateMessage } = require('../middleware/validation');
const { authorize, isOwner } = require('../middleware/authorization');
const Message = require('../models/Message');

// GET /messages - получить все сообщения (только для администраторов)
router.get('/', authorize(['admin']), getAllMessages);

// GET /messages/:id - получить сообщение по ID (только для владельца или администратора)
router.get('/:id', authorize(['user', 'moderator', 'admin']), isOwner(Message), getMessageById);

// POST /messages - создать новое сообщение (только для авторизованных пользователей)
router.post('/', authorize(['user', 'moderator', 'admin']), validateMessage, createMessage);

// PUT /messages/:id - обновить сообщение (только для владельца или администратора)
router.put('/:id', 
  authorize(['user', 'moderator', 'admin']), 
  isOwner(Message), 
  validateMessage, 
  updateMessage
);

// DELETE /messages/:id - удалить сообщение (только для владельца или администратора)
router.delete('/:id', 
  authorize(['user', 'moderator', 'admin']), 
  isOwner(Message), 
  deleteMessage
);

// GET /messages/user/:userId - получить все сообщения пользователя (только для владельца или администратора)
router.get('/user/:userId', authorize(['user', 'moderator', 'admin']), isOwner(Message), getMessagesByUser);

// GET /messages/conversation/:senderId/:receiverId - получить диалог между пользователями
router.get('/conversation/:senderId/:receiverId', getConversation);

// PUT /messages/:id/read - отметить сообщение как прочитанное (только для владельца)
router.put('/:id/read', authorize(['user', 'moderator', 'admin']), isOwner(Message), markAsRead);

module.exports = router;