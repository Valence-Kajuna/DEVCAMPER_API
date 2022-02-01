const express = require('express');
const {protect, authorize} = require('../middleware/auth');
const User = require('../models/User');
const advancedResults = require('../middleware/advancedResults');
const {getAllUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/user');

const router = express.Router({mergeParams: true});


router.use(protect);
router.use(authorize('admin'));

router.route('/')
    .get(advancedResults(User), getAllUsers)
    .post(createUser);


router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports =  router


