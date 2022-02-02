const express = require('express');
const router = express.Router();
const {getBootcamps, getBootcamp, createBootcamp, editBootcamp, deleteBootcamp, getBootcampsInRadius, uploadBootcampPhoto} = require('../controllers/bootcamps')

// Import advanced results middleware
const advancedResults = require('../middleware/advancedResults');
const {protect, authorize} = require('../middleware/auth');
// Impoer the bootcamp model
const Bootcamp = require('../models/Bootcamp');

// Include other resourse routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

// Reroute into other resourses router
router.use('/:bootcampId/courses',courseRouter);
router.use('/:bootcampId/reviews',reviewRouter);

// Creating routes
router.route('/:id/photo').put(protect,authorize('publisher','admin'),uploadBootcampPhoto);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/').get(advancedResults(Bootcamp),getBootcamps).post(protect, authorize('publisher', 'admin'),createBootcamp);
router.route('/:id').get(getBootcamp).put(protect,authorize('publisher', 'admin'),editBootcamp).delete(protect,authorize('publisher', 'admin'),deleteBootcamp);

module.exports = router