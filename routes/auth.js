const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

//@desc     Register User
//@Method   Get
//@route    /api/v1/auth/register
//@access   Public

exports.register = async (req, res, next) => {
    try {
        res.status(200).json({ success: true});
    } catch (error) {
        next(error);
    }

}
