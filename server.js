const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')

//Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to Database
connectDB();


// Import routes
const bootcamp = require('./routes/bootcamps')

// Create and express app
const app = express();

// Configuring some middleware
app.use(express.json()); // This is the middleware for the body parser.

//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Mount routes
app.use('/api/v1/bootcamps', bootcamp)

// Make an app listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));