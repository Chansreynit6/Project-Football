const express = require("express");
const router = express.Router();
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("../Controllers/ticketController");

// Routes for ticket operations
router.post("/", createTicket); // Create a ticket
router.get("/", getAllTickets); // Get all tickets
router.get("/:id", getTicketById); // Get ticket by ID
router.put("/:id", updateTicket); // Update ticket by ID
router.delete("/:id", deleteTicket); // Delete ticket by ID

module.exports = router;
