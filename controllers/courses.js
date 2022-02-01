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
        const bootcamp = await Bootcamp.findById(req.params.bootcampId);
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp with ID ${req.params.bootcampId} not found`, 404));
        }

        // Only admin and bootcamp owner can add course
        if(req.user.role !== 'admin' && req.user.id !== bootcamp.user.toString()){
            return next(new ErrorResponse(`The user with ID ${req.user.id} is not authorized to add course to this bootcamp`, 401));
        }

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
        const course = await Course.findById(req.params.id);
        if(!course){
            return next(new ErrorResponse(`Course with ID ${req.params.id} not found`, 404));
        }
        const bootcamp = await Bootcamp.findById(course.bootcamp);
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp with ID ${course.bootcamp} not found`, 404));
        }

        // Only admin and bootcamp owner can Update course
        if(req.user.role !== 'admin' && req.user.id !== bootcamp.user.toString()){
            return next(new ErrorResponse(`The user with ID ${req.user.id} is not authorized to update this course`, 401));
        }

        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
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
        if(!course){
            return next(new ErrorResponse(`Course with ID ${req.params.id} not found`, 404));
        }
        const bootcamp = await Bootcamp.findById(course.bootcamp);
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp with ID ${course.bootcamp} not found`, 404));
        }

        // Only admin and bootcamp owner can delete course
        if(req.user.role !== 'admin' && req.user.id !== bootcamp.user.toString()){
            return next(new ErrorResponse(`The user with ID ${req.user.id} is not authorized to delete this course`, 401));
        }
        
        await course.remove();

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        next(error)
    }
 
}