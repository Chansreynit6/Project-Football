const Ticket = require("../models/ticket");
const footballmatch = require("../models/matchModel");

// Controller to create a ticket
const createTicket = async (req, res) => {
  try {
    const { match_id, user_id, price, chair_number, status, date_selling } =
      req.body;

    // Check if all required fields are provided
    if (!match_id || !user_id || !price || !chair_number) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the match to ensure it exists
    const match = await footballmatch.findById(match_id);
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Create the ticket
    const ticket = new Ticket({
      match_id,
      user_id,
      price,
      chair_number,
      date_selling: date_selling || Date.now(), // Use provided date_selling or default to current date/time
      status: status || "booked", // Default to 'booked' if no status is provided
    });

    // Save the ticket to the database
    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket); // Return the created ticket as a response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find(); // This fetches all tickets from MongoDB
    res.status(200).json(tickets); // Responds with the tickets as JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handles errors, like connection issues
  }
};

// Controller to get a ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json(ticket); // Return the found ticket
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to update a ticket by ID
const updateTicket = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated ticket
    );
    if (!updatedTicket)
      return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json(updatedTicket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to delete a ticket by ID
const deleteTicket = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket)
      return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json({ message: "Ticket deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
