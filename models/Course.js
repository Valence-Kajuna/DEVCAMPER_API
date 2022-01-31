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

// Static function to get average of course
CourseSchema.statics.getAverageCost = async function(bootcampId){
    console.log('Calculating average cost'.blue);
    const obj = await this.aggregate([
        {
            $match: {bootcamp: bootcampId}
        },
        {
            $group: {
                _id: '$bootcamp',
                averageCost: {$avg : '$tuition'}
            }
        }]);

        console.log(obj);

        // Put the average cost to the database
        try {
            await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
                averageCost: Math.ceil(obj[0].averageCost / 10) * 10
            });
            
        } catch (error) {
            console.log(error);
        }
        
    }

// Create a mongoose middlware to run after course is saved
CourseSchema.post('save', function(next){
    this.constructor.getAverageCost(this.bootcamp);
});


// Midddleware to recalculate average cost when course is removed
CourseSchema.pre('remove', function(next){
    this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course',CourseSchema)
