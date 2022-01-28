const express = require('express');
const router = express.Router();
const {getBootcamps, getBootcamp, createBootcamp, editBootcamp, deleteBootcamp, getBootcampsInRadius} = require('../controllers/bootcamps')

// Creating routes
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/').get(getBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(editBootcamp).delete(deleteBootcamp);

module.exports = router