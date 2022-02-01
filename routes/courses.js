const express = require('express');
const {getCourses, getSingleCourse, createNewCourse,updateCourse, deleteCourse} = require('../controllers/courses');
const {protect, authorize} = require('../middleware/auth');
const router = express.Router({mergeParams: true});

router.route('/').get(getCourses).post(protect,authorize('publisher', 'admin'),createNewCourse);
router.route('/:id').get(getSingleCourse).put(protect,authorize('publisher', 'admin'),updateCourse).delete(protect,authorize('publisher', 'admin'),deleteCourse);

module.exports =  router
