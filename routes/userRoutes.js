const express = require('express');
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
router.get('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Update user role
// @route PUT /api/users/:id/role
// @access Private/Admin
router.put('/:id/role', protect, admin, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    const user = await User.findById(req.params.id);
    
    if (user) {
      user.role = role;
      const updatedUser = await user.save();
      
      res.json({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    // Prevent admin from deleting themselves
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }
    
    const user = await User.findById(req.params.id);
    
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Create new user (Admin only)
// @route POST /api/users
// @access Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create user
    const user = new User({
      name,
      email,
      password,
      role
    });
    
    const createdUser = await user.save();
    
    res.status(201).json({
      id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
