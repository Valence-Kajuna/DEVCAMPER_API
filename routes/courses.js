const express = require('express');
const {getCourses, getSingleCourse, createNewCourse,updateCourse} = require('../controllers/courses');

const router = express.Router({mergeParams: true});

router.route('/').get(getCourses).post(createNewCourse);
router.route('/:id').get(getSingleCourse).put(updateCourse);

module.exports =  router
