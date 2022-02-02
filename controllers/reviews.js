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