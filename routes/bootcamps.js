const express = require('express');
const router = express.Router();
const {getBootcamps, getBootcamp, createBootcamp, editBootcamp, deleteBootcamp} = require('../controllers/bootcamps')

// Creating routes
router.route('/').get(getBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(editBootcamp).delete(deleteBootcamp);

module.exports = router