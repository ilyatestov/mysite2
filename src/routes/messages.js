const express = require('express');
const router = express.Router();
const { getAllMessages, getMessageById, createMessage, updateMessage, deleteMessage, getMessagesByUser, getConversation, markAsRead } = require('../controllers/messageController');

// GET /messages - получить все сообщения
router.get('/', getAllMessages);

// GET /messages/:id - получить сообщение по ID
router.get('/:id', getMessageById);

// POST /messages - создать новое сообщение
router.post('/', createMessage);

// PUT /messages/:id - обновить сообщение
router.put('/:id', updateMessage);

// DELETE /messages/:id - удалить сообщение
router.delete('/:id', deleteMessage);

// GET /messages/user/:userId - получить все сообщения пользователя
router.get('/user/:userId', getMessagesByUser);

// GET /messages/conversation/:senderId/:receiverId - получить диалог между пользователями
router.get('/conversation/:senderId/:receiverId', getConversation);

// PUT /messages/:id/read - отметить сообщение как прочитанное
router.put('/:id/read', markAsRead);

module.exports = router;