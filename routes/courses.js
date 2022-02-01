const express = require('express');
const {getCourses, getSingleCourse, createNewCourse,updateCourse, deleteCourse} = require('../controllers/courses');
const {protect} = require('../middleware/auth');
const router = express.Router({mergeParams: true});

router.route('/').get(getCourses).post(protect,createNewCourse);
router.route('/:id').get(getSingleCourse).put(protect,updateCourse).delete(protect,deleteCourse);

module.exports =  router
