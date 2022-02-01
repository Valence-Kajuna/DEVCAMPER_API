const User = require('../models/User');

//@desc     Get all users
//@Method   Get
//@route    /api/v1/auth/users
//@access   Private/Admin
exports.getAllUsers = async (req, res, next) => {
    try {
        res.status(200).json(res.advancedResults);
    } catch (error) {
        next(error);
    }
};

//@desc     Get single user
//@Method   Get
//@route    /api/v1/auth/users/:id
//@access   Private/Admin
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);    
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}

//@desc     Create single user
//@Method   Post
//@route    /api/v1/auth/users
//@access   Private/Admin
exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body); 
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}

//@desc     Update user
//@Method   Put
//@route    /api/v1/auth/users/:id
//@access   Private/Admin
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }); 

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}

//@desc     Delete user
//@Method   Delete
//@route    /api/v1/auth/users/:id
//@access   Private/Admin
exports.deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
}