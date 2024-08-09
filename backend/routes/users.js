const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.error('User not found:', { email });
        return res.status(400).json({ message: 'Invalid email' });
      }
  
      // Compare provided password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        console.error('Incorrect password for email:', { email });
        return res.status(400).json({ message: 'Incorrect password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: '1h' });
  
      res.json({ token });
    } catch (err) {
      console.error('Error during login:', err); // Detailed error log
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new User({ email, password: hashedPassword, role });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;

