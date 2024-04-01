const validator = require('validator');

const signupValidation = (req, res, next) => {
  const { username, email, password, location, interest, type } = req.body;

  // Validate username
  if (!username || username.trim() === '') {
    return res.status(400).json({ error: 'Username is required' });
  }

  // Validate email address
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Validate password strength
  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  // Validate location
  if (!location || location.trim() === '') {
    return res.status(400).json({ error: 'Location is required' });
  }

  // Validate interest
  if (!interest || interest.trim() === '') {
    return res.status(400).json({ error: 'Interest is required' });
  }

  // Validate type (assuming it's required)
  if (!type || !['craftman', 'craftsman', 'customer'].includes(type)) {
    return res.status(400).json({ error: 'Invalid user type' });
  }

  // If all validations pass, proceed to the next middleware or route handler
  next();
};

module.exports = signupValidation;
