const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  match: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
});

module.exports = mongoose.model("Ticket", ticketSchema);
