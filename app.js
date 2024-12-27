const express = require('express');
const mongoose = require('mongoose');
const attractionsRouter = require('./labFinal/routes/routes');  // Path to routes.js inside labFinal folder

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// API routes (this handles routes prefixed with "/api")
app.use('/api', attractionsRouter);  // Prefix routes with "/api"

// Root route (handles the base URL, i.e., GET /)
app.get('/', (req, res) => {
  res.send('Welcome to the Tourism API!');
});

// Database connection and server start
const PORT = process.env.PORT || 3000;

mongoose
  .connect('mongodb://localhost:27017/tourism')  // Adjust connection string if needed
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
