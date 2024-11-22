const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const footballerRoutes = require('./routes/footballerRoutes'); // Ensure the path is correct


// Initialize the app
dotenv.config();
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/footballers', footballerRoutes); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
