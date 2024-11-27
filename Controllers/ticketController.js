const Ticket = require("../models/ticket");

// Controller to create a ticket
const createTicket = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    // Check if title and description are provided
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    // Create a new ticket using the provided or default data
    const ticket = new Ticket({
      title,
      description,
      status: status || "open", // Default to 'open' if no status is provided
      priority: priority || "medium", // Default to 'medium' if no priority is provided
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
