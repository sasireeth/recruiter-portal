// backend/routes/applications.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const StatusChangeLog = require('../models/StatusChangeLog');
const verifyToken  = require('../middleware/roleMiddleware');
const { sendEmail } = require('../services/emailService');

// Get all applications
router.get('/' ,async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update application status
router.put('/:id/status',verifyToken, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log(req.user);
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
  
    try {
      const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      const statusChange = new StatusChangeLog({
        applicationId: application._id,
        status,
        changedBy: req.user.id,
        changedAt: new Date(),
        type: 'single'
      });
      await statusChange.save();
  
      res.json(application);
    } catch (err) {
      console.error('Error updating status:', err);  
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// Bulk update status
router.put('/bulk-update', verifyToken, async (req, res) => {
    try {
      const { ids, status } = req.body;
  
      if (!Array.isArray(ids) || !status) {
        return res.status(400).json({ error: 'Invalid input data' });
      }
  
      // Update multiple applications
      const result = await Application.updateMany(
        { _id: { $in: ids } },
        { $set: { status } }
      );
  
      // Log the bulk status change
      const statusChange = new StatusChangeLog({
        applicationIds: ids,
        status,
        changedBy: req.user.id,
        changedAt: new Date(),
        type: 'bulk'
      });
      await statusChange.save();
  
      res.json(result);
    } catch (err) {
      console.error('Error bulk updating status:', err); 
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;
