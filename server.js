const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')

//Load env variables
dotenv.config({ path: './config/config.env' });

// Import routes
const bootcamp = require('./routes/bootcamps')

// Create and express app
const app = express();

// Configuring some middleware

//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Mount routes
app.use('/api/v1/bootcamps', bootcamp)

// Make an app listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));