// models/user.js
const db = require('../Config/DB');
const bcrypt = require('bcrypt');

const User = {};

User.createUser = (userData, callback) => {
  const { username, email, password, location, type, interest } = userData;
  const sql = 'INSERT INTO user (username, email, password, location, type, interest) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [username, email, password, location, type, interest];

  db.query(sql, values, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};




User.getUserType = (userId, callback) => {
  const sql = 'SELECT type FROM user WHERE uid = ?';
  const values = [userId];

  if (callback && typeof callback === 'function') {
    // If a callback function is provided, execute the query with callback-based approach
    db.query(sql, values, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      if (result.length === 0) {
        return callback(new Error('User not found'), null);
      }
      const userType = result[0].type;
      return callback(null, userType);
    });
  } else {
    // If no callback is provided, return a promise
    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) {
          return reject(err);
        }
        if (result.length === 0) {
          return reject(new Error('User not found'));
        }
        const userType = result[0].type;
        return resolve(userType);
      });
    });
  }
};



User.updateProfile = (userId, userData, callback) => {
  const { username, email, password, location, interest } = userData;

  let updateQuery = 'UPDATE user SET ';
  let updateValues = [];
  
  if (username) {
    updateQuery += 'username=?, ';
    updateValues.push(username);
  }

  if (email) {
    updateQuery += 'email=?, ';
    updateValues.push(email);
  }

  if (password) {
    updateQuery += 'password=?, ';
    updateValues.push(password);
  }

  if (location) {
    updateQuery += 'location=?, ';
    updateValues.push(location);
  }

  if (interest) {
    updateQuery += 'interest=?, ';
    updateValues.push(interest);
  }

  // Remove trailing comma and space
  updateQuery = updateQuery.slice(0, -2);
  
  // Add WHERE clause for user ID
  updateQuery += ' WHERE uid=?';
  updateValues.push(userId);

  db.query(updateQuery, updateValues, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};


User.deleteProfile = (userId, callback) => {
  const sql = 'DELETE FROM user WHERE uid = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

// Search users function
User.searchUsers = (query, callback) => {
  const sql = 'SELECT * FROM user WHERE username LIKE ? OR interest LIKE ?'; // Customize the SQL query based on your search criteria
  const searchQuery = `%${query}%`; // Assuming you want to search for usernames or interests containing the query

  db.query(sql, [searchQuery, searchQuery], (err, users) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, users);
  });
};


module.exports = User;
