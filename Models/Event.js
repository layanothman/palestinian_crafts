const db = require('../Config/DB');

const Event = {};

Event.createEvent = async (eventData) => {
  const { uid, event_name, event_description, location, craft, status } = eventData;
  const sql = 'INSERT INTO event (uid, event_name, event_description, location, craft, status) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [uid, event_name, event_description, location, craft, status];

  await db.query(sql, values);
};

Event.findOne = async (criteria) => {
  const { uid, event_name } = criteria; // Only get uid and event_name from criteria
  const sql = 'SELECT * FROM event WHERE uid = ? AND event_name = ?';
  const values = [uid, event_name];

  const results = await db.query(sql, values);
  if (results.length === 0) {
    return null;
  } else {
    return results[0];
  }
};



Event.deleteEventByNameAndUID = (event_name, uid, callback) => {
  const sql = 'DELETE FROM event WHERE event_name = ? AND uid = ?';

  db.query(sql, [event_name, uid], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(null, { status: 404, message: 'Event not found for deletion' });
    }
    return callback(null, { status: 200, message: 'Event deleted successfully' });
  });
};


Event.updateEvent = async (eventData) => {
  try {
    const { uid, event_name, event_description, location, craft, status } = eventData;
    const sql = 'UPDATE event SET event_description = ?, location = ?, craft = ?, status = ? WHERE uid = ? AND event_name = ?';
    const values = [event_description, location, craft, status, uid, event_name];

    const result = await db.query(sql, values);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};


Event.getAllEvents = (callback) => {
  const sql = 'SELECT * FROM event';

  db.query(sql, (err, events) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, events);
  });
};
















module.exports = Event;
