const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');

//@desc     Get all bootcamps
//@Method   Get
//@route    /api/v1/bootcamps
//@access   Public
exports.getBootcamps = async (req,res,next) =>{
    try {
        let query;

        // Creating a copy of a query object
        reqQuery = {...req.query}

        //Create a remove fields array
        const removeFields = ['select', 'sort', 'page', 'limit']
        
        // Remove the fields from the copy
        removeFields.forEach(field => delete reqQuery[field])
        
        // Creating a string version of a query object
        let queryStr = JSON.stringify(reqQuery)

        // Making mongo operatiors like $lt, $gt, $in etc
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        // Querying with filters
        query = Bootcamp.find(JSON.parse(queryStr)).populate({
            path: 'courses',
            select: 'title description'
        });

        // Implemented the select query
        if (req.query.select){
            var selectFields = req.query.select.split(',').join(' ');
            query.select(selectFields)
        }

        // Implementing the sort query
        if (req.query.sort) {
            var sortFields = req.query.sort.split(',').join(' ');
            query.sort(sortFields);
        }

        // Implementing pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 1;
        const startIndex = (page-1)* limit;
        const total = await Bootcamp.count();
        const endIndex = page * limit;

        query.skip(startIndex).limit(limit)

        pagination = {};

        if(startIndex>0){
            pagination.previous = {previous : page-1, limit: limit}
        }

        if(endIndex < total){
            pagination.next = {next: page +1, limit: limit}
        }



        const bootcamps = await query;
        res.status(200).json({
            success: true,
            count : bootcamps.length,
            pagination,
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