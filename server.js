const express = require('express');
const dotenv = require('dotenv');

//Load env variables
dotenv.config({ path: './config/config.env' });

// Create and express app
const app = express();

// Creating sample route
app.get('/api/v1/bootcamps', (req, res)=>{
    res.sendStatus(200).json(
        {
            "success":true,
            "msg": "Show all bootcamps"
        }
    )
})

// Make an app listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));