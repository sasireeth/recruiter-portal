const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: mongoose.Schema.Types.ObjectId,
  recipient: mongoose.Schema.Types.ObjectId,
  content: String,
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);  