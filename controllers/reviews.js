const ErrorResponse = require('../utils/errorResponse');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');



//@desc     Get Reviews
//@Method   Get
//@route    /api/v1/reviews
//@route    /api/v1/bootcamps/:bootcampId/reviews
//@access   Public
exports.getReviews = async (req,res,next) =>{
    try {
        if(req.params.bootcampId){
            const reviews = await Review.find({bootcamp : req.params.bootcampId})
            res.status(200).json({
                success: true,
                count: reviews.length,
                data: reviews
            });
        }else{
            res.status(200).json(res.advancedResults);
        }
        
    } catch (error) {
        next(error)
    }
}



//@desc     Get a Single Review
//@Method   Get
//@route    /api/v1/reviews/:id
//@access   Public
exports.getReview = async (req,res,next) =>{
    try {
       const review = await Review.findById(req.params.id).populate(
           {
               path: 'bootcamp',
               select: 'name description'
           }
       );

       if(!review){
           return next(new ErrorResponse('Review not found'), 404);
       }

         res.status(200).json({
                success: true,
                data: review
            });
            
    } catch (error) {
        next(error)
    }
}

//@desc     Create a New Review
//@Method   Post
//@route    /api/v1/bootcamps/:bootcampId/reviews
//@access   Private
exports.createReview = async (req,res,next) =>{
    try {
       req.body.bootcamp = req.params.bootcampId;
       req.body.user = req.user.id;
       const bootcamp = await Bootcamp.findById(req.params.bootcampId);
         if(!bootcamp){
             return next(new ErrorResponse('Bootcamp not found'), 404);
            }
        
        const review = await Review.create(req.body);
        res.status(201).json({
            success: true,
            data: review
        }); 
        

    } catch (error) {
        next(error)
    }
}
