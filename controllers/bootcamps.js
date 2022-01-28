const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');

//@desc     Get all bootcamps
//@Method   Get
//@route    /api/v1/bootcamps
//@access   Public
exports.getBootcamps = async (req,res,next) =>{
    let queryStr = JSON.stringify(req.query)
    queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    let query = JSON.parse(queryStr)
    console.log(query)
    try {
        const bootcamps = await Bootcamp.find(query);
        res.status(200).json({
            success: true,
            count : bootcamps.length,
            data: bootcamps
        });
        
    } catch (error) {
        next(error);
    }
}

//@desc     Get single bootcamp
//@Method   Get
//@route    /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = async (req,res,next) =>{
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        
        res.status(200).json({
            success: true,
            data: bootcamp
        });


    } catch (error) {
        next(error);
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
        next(error);
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

        res.status(200).json({
            success: true,
            body: bootcamp
        });
        
    } catch (error) {
        next(error);
    }
}

//@desc     Get all bootcamps
//@Method   Delete
//@route    /api/v1/bootcamps/:id
//@access   Public
exports.deleteBootcamp = async (req,res,next) =>{
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success : true,
            data: {}
        })
    } catch (error) {
        next(error);
    }
}


//@desc     Get bootcamps by radius
//@Method   Get
//@route    /api/v1/bootcamps/:zipcode/:distance
//@access   Public
exports.getBootcampsInRadius = async (req,res,next) =>{
    try {
        const {zipcode, distance} = req.params;
        const radius = distance/3963.2; // these units are in miles.
        loc = await geocoder.geocode(zipcode);
        longitude = loc[0].longitude;
        latitude = loc[0].latitude;

        const bootcamps = await Bootcamp.find(
            {location : { $geoWithin: { $centerSphere: [ [ longitude, latitude ], radius ] } }}
        );

        res.status(200).json({
            success : true,
            count: bootcamps.length,
            data: bootcamps
        });
    } catch (error) {
        next(error);
    }
}