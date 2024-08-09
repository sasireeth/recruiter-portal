const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  candidateName: String,
  jobTitle: String,
  applicationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['new', 'shortlisted', 'rejected', 'interview scheduled'], default: 'new' },
  resume: String,
  coverLetter: String,
  candidateEmail: String
});

module.exports = mongoose.model('Application', ApplicationSchema);
