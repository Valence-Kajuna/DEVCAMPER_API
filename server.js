const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler =  require('./middleware/error')
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

//Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to Database
connectDB();


// Import routes
const bootcamp = require('./routes/bootcamps');
const course = require('./routes/courses');
const user = require('./routes/user');
const auth = require('./routes/auth');
const review = require('./routes/reviews');

// Create and express app
const app = express();

// Configuring some middleware
app.use(express.json()); // This is the middleware for the body parser.
app.use(cookieParser()); // This is the middleware for cookies


//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// File upload middleware
app.use(fileUpload());

// Sanitize inpute
app.use(mongoSanitize());

// Mount routes
app.use('/api/v1/bootcamps', bootcamp);
app.use('/api/v1/courses', course);
app.use('/api/v1/users', user)
app.use('/api/v1/auth', auth);
app.use('/api/v1/reviews', review);
app.use(errorHandler)

// Make an app listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));