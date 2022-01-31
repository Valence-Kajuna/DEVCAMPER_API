const express = require('express');
const router = express.Router();
const {getBootcamps, getBootcamp, createBootcamp, editBootcamp, deleteBootcamp, getBootcampsInRadius, uploadBootcampPhoto} = require('../controllers/bootcamps')

// Import advanced results middleware
const advancedResults = require('../middleware/advancedResults');
// Impoer the bootcamp model
const Bootcamp = require('../models/Bootcamp');

// Include other resourse routers
const courseRouter = require('./courses');

// Reroute into other resourses router
router.use('/:bootcampId/courses',courseRouter);

// Creating routes
router.route('/:id/photo').put(uploadBootcampPhoto);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/').get(advancedResults(Bootcamp),getBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(editBootcamp).delete(deleteBootcamp);

module.exports = router