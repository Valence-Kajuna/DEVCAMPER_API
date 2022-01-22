const Bootcamp = require('../models/Bootcamp');

//@desc     Get all bootcamps
//@Method   Get
//@route    /api/v1/bootcamps
//@access   Public
exports.getBootcamps = async (req,res,next) =>{
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({
            success: true,
            data: bootcamps
        });
        
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}

//@desc     Get single bootcamp
//@Method   Get
//@route    /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = (req,res,next) =>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Bootcamp with id ${req.params.id}`
        }
    )   
}

//@desc     Create new bootcamp
//Method    Post
//@route    /api/v1/bootcamps
//@access   Public
exports.createBootcamp = async (req,res,next) =>{
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json(
            {
                "success": true,
                "data": bootcamp
            }
        )
        
    } catch (error) {
        res.status(400).json({
            "success": false
        });
    }
    
}

//@desc     Edit a bootcamp
//@Method   Put
//@route    /api/v1/bootcamps:/id
//@access   Public
exports.editBootcamp = (req,res,next) =>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Edited bootcamp with id ${req.params.id}`
        }
    )
}

//@desc     Get all bootcamps
//@Method   Delete
//@route    /api/v1/bootcamps/:id
//@access   Public
exports.deleteBootcamp = (req,res,next) =>{
    res.status(200).json(
        {
            "success": true,
            "msg": `Deleted bootcamp ${req.params.id}`
        }
    )
}