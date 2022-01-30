const express = require('express');
const {getCourses, getSingleCourse} = require('../controllers/courses');

const router = express.Router({mergeParams: true});

router.route('/').get(getCourses);
router.route('/:id').get(getSingleCourse);

module.exports =  router
