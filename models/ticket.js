const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  // Title of the ticket, required field
  title: { type: String, required: true },

  // Description of the ticket, required field
  description: { type: String, required: true },

  // Status of the ticket, defaults to 'open' if not provided
  status: { type: String, default: "open" },

  // Priority of the ticket, with default value 'medium'
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },

  // Timestamp for when the ticket was created
  created_at: { type: Date, default: Date.now },

  // Timestamp for when the ticket was last updated
  updated_at: { type: Date },
});

// Create and export the Ticket model
const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
