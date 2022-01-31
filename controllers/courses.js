const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');

//@desc     Get courses
//@Method   Get
//@route    /api/v1/courses
//@route    /api/v1/bootcamps/:bootcampId/courses
//@access   Public
exports.getCourses = async (req,res,next) =>{
    try {
        let query;
        if(req.params.bootcampId){
            query =Course.find({bootcamp: req.params.bootcampId});
        }else{
            query =  Course.find().populate({
                path: 'bootcamp',
                select: 'name description'
            });
        }

        const courses = await query;

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        })
        
    } catch (error) {
        next(error)
    }
}

//@desc     Get single course
//@Method   Get
//@route    /api/v1/courses/:id
//@access   Public
exports.getSingleCourse =  async (req,res, next)=>{
    try {
        const course = await Course.findById(req.params.id);

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        
    }
}

//@desc     Create a new course
//@Method   Post
//@route    /api/v1/bootcamps/:bootcampId/courses
//@access   Private
exports.createNewCourse =  async (req,res, next) =>{
    try {
        req.body.bootcamp  = req.params.bootcampId;
        const course = await Course.create(req.body);

        res.status(201).json({
            success: true,
            data: course
        })
    } catch (error) {
        next(error)
    }
 
}

//@desc     Update a course
//@Method   Put
//@route    /api/v1/courses/:id
//@access   Private
exports.updateCourse =  async (req,res, next) =>{
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            success: true,
            data: course
        })
    } catch (error) {
        next(error)
    }
 
}

//@desc     Delete a course
//@Method   Delete
//@route    /api/v1/courses/:id
//@access   Private
exports.deleteCourse =  async (req,res, next) =>{
    try {
        const course = await Course.findById(req.params.id);
        await course.remove();

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        next(error)
    }
 
}