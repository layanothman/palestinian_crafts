const Event = require('../Models/Event');
const User = require('../Models/Users');
const util = require('util');

const eventsController = {};

eventsController.addEvent = async (req, res) => {
  try {
    const { uid, event_name, event_description, location, craft, status } = req.body;

   // Promisify the getUserType function
const getUserTypeAsync = util.promisify(User.getUserType);

// Now you can use getUserTypeAsync with await
try {
  const userType = await getUserTypeAsync(uid);
  // Rest of your code here
} catch (error) {
  console.error('Error fetching user type:', error);
  return res.status(500).json({ error: 'Failed to check user type. Please try again later.' });
}
    

    if (!event_name || !event_description || !location || !craft || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingEvent = await Event.findOne({ uid, event_name, event_description, location, craft, status });
    if (existingEvent) {
      return res.status(400).json({ error: 'An event with the same details already exists for this user' });
    }

    await Event.createEvent({ uid, event_name, event_description, location, craft, status });
    return res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    console.error('Error adding event:', error);
    return res.status(500).json({ error: 'Failed to add an event. Please try again later.' });
  }
};


eventsController.deleteEventByNameAndUID = (req, res) => {
  const { event_name, uid } = req.body;

  Event.deleteEventByNameAndUID(event_name, uid, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete event. Please try again later.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found for deletion' });
    }

    return res.status(200).json({ message: 'Event deleted successfully' });
  });
};



eventsController.updateEvent = async (req, res) => {
  try {
    const { uid, event_name, event_description, location, craft, status } = req.body;

    // Check if the user is allowed to update events
    const userType =  await User.getUserType(uid);
    if (userType !== 'craftman') {
      return res.status(403).json({ error: 'Only craftsmen are allowed to update events' });
    }

    // Check if the event exists
    const existingEvent = await Event.findOne({ uid, event_name });
    if (existingEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Update the event
    const updated = await Event.updateEvent({ uid, event_name, event_description, location, craft, status });
    if (updated) {
      return res.status(500).json({ error: 'Failed to update the event' });
    }

    return res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating event:', error);
    return res.status(500).json({ error: 'Failed to update the event. Please try again later.' });
  }
};

eventsController.getAllEvents = (req, res) => {
  Event.getAllEvents((err, events) => {
    if (err) {
      console.error('Error fetching events:', err);
      return res.status(500).json({ error: 'Failed to fetch events. Please try again later.' });
    }
    return res.status(200).json({ events });
  });
};




module.exports = eventsController;
