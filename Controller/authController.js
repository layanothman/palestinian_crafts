// controllers/authController.js
const User = require('../Models/Users');
const validator = require('validator'); // Import validator library for email validation
const bcrypt = require('bcrypt'); // Import bcrypt library for password hashing

const authController = {};

authController.signup = (req, res) => {
  const { username, email, password, location, interest } = req.body;

  // Validate email address
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Validate password strength
  if (!isValidPassword(password)) {
    return res.status(400).json({ error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long' });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Failed to create user. Please try again later.' });
    }

    const userData = { username, email, password: hashedPassword, location, interest };
    
    // Create user with hashed password
    User.createUser(userData, (err, result) => {
      if (err) {
        console.error('Error signing up:', err);
        return res.status(500).json({ error: 'Failed to sign up. Please try again later.' });
      }
      console.log('User signed up successfully');
      return res.status(201).json({ message: 'User signed up successfully' });
    });
  });
};

function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}


authController.login = (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Fetch user from database by email
  User.getUserByEmail(email, (err, user) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Failed to fetch user. Please try again later.' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare provided password with hashed password stored in the database
    bcrypt.compare(password, user.password, (compareErr, result) => {
      if (compareErr) {
        console.error('Error comparing passwords:', compareErr);
        return res.status(500).json({ error: 'Failed to authenticate. Please try again later.' });
      }
      if (!result) {
        console.log('Password comparison failed for user:', email);
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Passwords match, user authenticated
      return res.status(200).json({ message: 'Login successful', user });
    });
  });
};






authController.updateProfile = (req, res) => {
  const userId = req.params.id; 
  let { username, email, password, location, interest } = req.body;

  // Hash the password if it is provided
  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ error: 'Failed to update profile. Please try again later.' });
      }
      // Update user profile with hashed password
      updateProfileWithHashedPassword(userId, username, email, hashedPassword, location, interest, res);
    });
  } else {
    // Update user profile without hashing the password
    updateProfileWithHashedPassword(userId, username, email, password, location, interest, res);
  }
};

function updateProfileWithHashedPassword(userId, username, email, password, location, interest, res) {
  // Update user profile
  User.updateProfile(userId, { username, email, password, location, interest }, (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: 'Failed to update profile. Please try again later.' });
    }
    console.log('Profile updated successfully');
    return res.status(200).json({ message: 'Profile updated successfully' });
  });
}
authController.deleteProfile = (req, res) => {
  const userId = req.params.id; // Assuming the user ID is passed as a route parameter

  // Delete user profile
  User.deleteProfile(userId, (err, result) => {
    if (err) {
      
      return res.status(500).json({ error: 'Failed to delete profile. Please try again later.' });
    }

    if (result.affectedRows === 0) {
      
      return res.status(404).json({ error: 'Profile not found for deletion' });
    }

   
    return res.status(200).json({ message: 'Profile deleted successfully' });
  });
};


// Search users function
authController.searchUsers = (req, res) => {
  const { query } = req.query; // Assuming the search query is passed as a query parameter

  // Perform search query in the database
  User.searchUsers(query, (err, users) => {
    if (err) {
      console.error('Error searching users:', err);
      return res.status(500).json({ error: 'Failed to search users. Please try again later.' });
    }
    return res.status(200).json({ users });
  });
};



module.exports = authController;
