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
            count : bootcamps.length,
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
exports.getBootcamp = async (req,res,next) =>{
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp){
            throw "No bootcamp"
        }
        res.status(200).json({
            success: true,
            data: bootcamp
        });


    } catch (error) {
        next(error);
        // res.status(400).json(
        //     {
        //         success: false
        //     }
        // )
    }
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
exports.editBootcamp = async (req,res,next) =>{
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!bootcamp){
            throw "No bootcamp"
        }

        res.status(200).json({
            success: true,
            body: bootcamp
        });
        
    } catch (error) {
        res.status(400).json({
            success: false
        });
    }
}

//@desc     Get all bootcamps
//@Method   Delete
//@route    /api/v1/bootcamps/:id
//@access   Public
exports.deleteBootcamp = async (req,res,next) =>{
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcamp){
            throw ''
        }
        res.status(200).json({
            success : true,
            data: {}
        })
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}