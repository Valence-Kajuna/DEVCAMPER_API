const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

//@desc     Register User
//@Method   Get
//@route    /api/v1/auth/register
//@access   Public

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }

}


//@desc     Login User
//@Method   Post
//@route    /api/v1/auth/login
//@access   Public
exports.login = async (req, res, next) => {
    try {
        const {email, password } = req.body;
        
        // Validate email and password
        if(!email || !password){
            return next(new ErrorResponse('Please provide an email and password', 400));
        }

        //Check for user
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return next(new ErrorResponse('Invalid Credentials', 401));
        }

        // Check if password matched
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return next(new ErrorResponse('Invalid Credentials', 401));
        }

    
        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }

}

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_MAX_AGE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production'){
        secure: true
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });

}



//@desc     Get current Logged in User
//@Method   Get
//@route    /api/v1/auth/me
//@access   Privare
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        next(error);
    }

}

//@desc     Forgot password
//@Method   Post
//@route    /api/v1/auth/forgotpassword
//@access   Private
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return next(new ErrorResponse(`No user with email ${req.body.email}`, 404));
        }
        const token = user.getResetPasswordToken();
        console.log(token);
        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        next(error);
    }

}