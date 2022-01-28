// Importing mongoose module
const mongoose = require('mongoose');

// Creating a mongoose schema

const CourseSchema =  new mongoose.Schema(
    {
        title : {
            type: String,
            trim : true,
            required : [true, 'Please add a Course title']
        },
        description: {
            type: String,
            required: [true, 'Please add course description']
    }
)
