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
        },
        weeks: {
            type: Number,
            required: [true,'Please add number of weeks']
        },
        tuition: {
            type: Number,
            required: [true,'Please add a tuition cost']
        },
        minimumSkill: {
            type: String,
            required: [true,'Please add a minimum skill'],
            enum : ['beginner', 'intermediate', 'advanced']
        },
        minimumSkill: {
            type: String,
            required: [true,'Please add a minimum skill'],
            enum : ['beginner', 'intermediate', 'advanced']
        },
        ScholarshipAvailable:{
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        bootcamp:{
            type: mongoose.Schema.ObjectId,
            ref: 'Bootcamp',
            required: true
        }
}
);

module.exports = mongoose.model('Course',CourseSchema)
