const mongoose = require ('mongoose');

const footballSchema = new mongoose. Schema({
    name: {type: String,require :true,},
    dob: { type: String, required: true }, 
    position: {type: String,require :true},
    nationallity: {type: String,require :true},
    image: {type: String,require :true},
    });

   module.exports =mongoose.model ("Footballer", footballSchema);  
