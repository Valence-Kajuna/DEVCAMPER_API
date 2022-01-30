const express = require('express');
const {getCourses, getSingleCourse, createNewCourse} = require('../controllers/courses');

const router = express.Router({mergeParams: true});

router.route('/').get(getCourses).post(createNewCourse);
router.route('/:id').get(getSingleCourse);

module.exports =  router
