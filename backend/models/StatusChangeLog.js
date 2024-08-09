const mongoose = require('mongoose');

const StatusChangeLogSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
  applicationIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  status: { type: String, required: true },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  changedAt: { type: Date, default: Date.now },
  type: { type: String, enum: ['single', 'bulk'], required: true }
});

module.exports = mongoose.model('StatusChangeLog', StatusChangeLogSchema);
