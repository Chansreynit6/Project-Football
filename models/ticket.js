const mongoose = require("mongoose");

// Define the Ticket schema
const ticketSchema = new mongoose.Schema({
  // Reference to the match this ticket is for
  match_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },

  // Reference to the user who booked the ticket
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Price of the ticket
  price: { type: Number, required: true },

  // Chair or seat number assigned to the ticket
  chair_number: { type: String, required: true },

  // Date when the ticket was sold or booked
  date_selling: { type: Date, default: Date.now }, // Defaults to current date and time

  // Status of the ticket (e.g., booked or canceled)
  status: {
    type: String,
    enum: ["booked", "canceled"], // You can add more statuses if needed
    default: "booked", // Default status is 'booked'
  },

  // Timestamp for when the ticket was created
  created_at: { type: Date, default: Date.now },

  // Timestamp for when the ticket was last updated
  updated_at: { type: Date },
});

// Middleware to update the 'updated_at' field on ticket updates
ticketSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

// Create and export the Ticket model
const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
