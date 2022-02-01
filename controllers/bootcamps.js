const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');
const path = require('path');

//@desc     Get all bootcamps
//@Method   Get
//@route    /api/v1/bootcamps
//@access   Public
exports.getBootcamps = async (req,res,next) =>{
    try {
       
        res.status(200).json(res.advancedResults);
        
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
//@access   Private
exports.createBootcamp = async (req,res,next) =>{
    try {
        req.body.user = req.user.id;
        
        // Making sure user can add bootcamp once except for admin
        const bootcamp = await Bootcamp.findOne({user: req.user.id});
        if(bootcamp && req.user.role !== 'admin'){
            return next(new ErrorResponse(`The user with ID ${req.user.id} has already added a bootcamp`, 400));
        }
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
//@access   Private
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
        const bootcamp = await Bootcamp.findById(req.params.id);
        bootcamp.remove();
        res.status(200).json({
            success : true,
            data: {}
        })
        }catch (error) {
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

//@desc     Upload Bootcamp Photo
//@Method   Put
//@route    /api/v1/bootcamps/:id/photo
//@access   Private
exports.uploadBootcampPhoto = async (req,res,next) =>{
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp){
            throw new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404);
        }
        if(!req.files){
            throw new ErrorResponse(`Please upload a file`, 400);
        }
        const file = req.files.file;
        if(!file.mimetype.startsWith('image')){
            throw new ErrorResponse(`Please upload an image file`, 400);
        }
        if(file.size > process.env.MAX_FILE_UPLOAD){
            throw new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400);
        }
        file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err =>{
            if (err) {
                console.log(err)
                throw new ErrorResponse(`Problem with file upload`, 500);
            }
        });

        bootcamp.photo = file.name;
        bootcamp.save();
        res.status(200).json({
            success: true,
            data: bootcamp.photo
        });
    } catch (error) {
        next(error);
    }
        
    }