const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors')
const dotenv = require ('dotenv');

//Load env variables
dotenv.config({ path: './config/config.env' });

// Create a new mongoose connectio 

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology: true

});

// Import the bootcamp models
const Bootcamp = require('./models/Bootcamp')

// Read a json file for bootcamps

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`));

// Import data
 const importData =  async ()=>{
     try {
         await Bootcamp.create(bootcamps);
         console.log('Data Imported'.green.inverse)
         process.exit();
     } catch (error) {
         console.log(error)
     }
 }


 // Delete data
 const deleteData =  async ()=>{
     try {
         await Bootcamp.deleteMany();
         console.log('Data deleted'.red.inverse);
        process.exit();
     } catch (error) {
         
     }
 }

 if (process.argv[2] === '-i'){
     importData();
 }else if(process.argv[2] === '-d'){
     deleteData();
 }