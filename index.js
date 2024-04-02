


const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/authRoutes');
const PORT = process.env.PORT || 8000;
const app = express();

// Connect to database
const db = require('./Config/DB');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use('/api', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


