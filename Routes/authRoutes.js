// routes/authRoutes.js
const express = require('express');
const authController = require('../Controller/authController');
const eventsController = require('../Controller/eventsController'); // Import the event controller

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

// POST  route for creating events
router.post('/addevent', eventsController.addEvent);

router.delete('/events', eventsController.deleteEventByNameAndUID);

// PUT  route for updating events
router.put('/updatevents', eventsController.updateEvent);

// Define a route to fetch all events
router.get('/events', eventsController.getAllEvents);



module.exports = router;
