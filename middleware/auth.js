const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


// Protect routes
exports.protect = async (req, res, next) => {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];

    }
    // else if(req.cookies.token){
    //     token = req.cookies.token;
    // }

    if(!token){
        return new ErrorResponse('Not authorized to acccess this route', 401);
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
    }catch(error){
        return new ErrorResponse('Not authorized to acccess this route', 401);
    }

}