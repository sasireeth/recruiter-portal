const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const verifyToken  = require('../middleware/roleMiddleware');
const { io }= require('../socket/socket');

// Send a message
router.post('/', verifyToken, async (req, res) => {
  const { candidateId, content } = req.body;
  const message = new Message({
    sender: req.user.id,
    recipient: candidateId,
    content,
    sentAt: new Date()
  });

  try {
    const newMessage = await message.save();
    const receiverUser = await User.findById(req.user.id);
    const [name]=receiverUser.email.split('@');
    io.emit('notification', { message: `New message from ${name}`,content});
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get messages for a candidate
router.get('/:candidateId', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.params.candidateId });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
