// routes/authRoutes.js
const express = require('express');
const authController = require('../Controller/authController');
const eventsController = require('../Controller/eventsController');
const signupValidation = require('../middleware/signupValidation');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

// POST /signup route with signupValidation middleware
router.post('/signup', signupValidation, authController.signup);


// // POST /signup route
// router.post('/signup', authController.signup);

// POST /login route
router.post('/login', authController.login);

// Update profile route - Requires authentication
router.put('/profile/:id', authMiddleware, authController.updateProfile);

// Delete profile route - Requires authentication
router.delete('/profile/:id', authMiddleware, authController.deleteProfile);

// Search users route - Requires authentication
router.get('/search/users', authMiddleware, authController.searchUsers);

// POST route for creating events - Requires authentication
router.post('/addevent', authMiddleware, eventsController.addEvent);

// DELETE route for deleting events - Requires authentication
router.delete('/events', authMiddleware, eventsController.deleteEventByNameAndUID);

// PUT route for updating events - Requires authentication
router.put('/updatevents', authMiddleware, eventsController.updateEvent);

// Define a route to fetch all events
router.get('/events', eventsController.getAllEvents);



module.exports = router;
