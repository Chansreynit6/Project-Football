const mongoose = require("mongoose");

const footballerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  nationality: { type: String, required: true },
  positions: { type: [String], required: true }, 
  image: { type: String },
  team: { type: String, required: false }
  
});

module.exports = mongoose.model("Footballer", footballerSchema);
