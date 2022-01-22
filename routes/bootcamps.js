const express = require('express');
const router = express.Router();

//Get all bootcamps
router.get('/api/v1/bootcamps', (req, res)=>{
    res.status(200).json(
        {
            "success":true,
            "msg": "Show all bootcamps"
        }
    )
})

// Get a single bootcamp
router.get('/api/v1/bootcamps/:id', (req,res)=>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Bootcamp with id ${req.params.id}`
        }
    )
})

// Create a bootcamp
router.post('/api/v1/bootcamps', (req,res)=>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Created a new bootcamp`
        }
    )
})

// Edit a bootcamp
router.put('/api/v1/bootcamps/:id', (req,res)=>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Edited bootcamp with id ${req.params.id}`
        }
    )
})


// Delete a bootcamp
router.delete('/api/v1/bootcamps/:id', (req,res)=>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Deleted bootcamp ${req.params.id}`
        }
    )
})