const express = require('express');
const dotenv = require('dotenv');

//Load env variables
dotenv.config({ path: './config/config.env' });

// Create and express app
const app = express();

//Get all bootcamps
app.get('/api/v1/bootcamps', (req, res)=>{
    res.status(200).json(
        {
            "success":true,
            "msg": "Show all bootcamps"
        }
    )
})

// Get a single bootcamp
app.get('/api/v1/bootcamps/:id', (req,res)=>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Bootcamp with id ${req.params.id}`
        }
    )
})

// Create a bootcamp
app.post('/api/v1/bootcamps', (req,res)=>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Created a new bootcamp`
        }
    )
})

// Edit a bootcamp
app.put('/api/v1/bootcamps/:id', (req,res)=>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Edited bootcamp with id ${req.params.id}`
        }
    )
})


// Delete a bootcamp
app.delete('/api/v1/bootcamps/:id', (req,res)=>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Deleted bootcamp ${req.params.id}`
        }
    )
})

// Make an app listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));