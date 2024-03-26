// routes/authRoutes.js
const express = require('express');
const authController = require('../Controller/authController');

const router = express.Router();

// POST /signup route
router.post('/signup', authController.signup);

// POST /login route
router.post('/login', authController.login);

// Update profile route
router.put('/profile/:id', authController.updateProfile);

// Delete profile route
router.delete('/profile/:id', authController.deleteProfile);

// Search users route
router.get('/search/users', authController.searchUsers);


module.exports = router;
