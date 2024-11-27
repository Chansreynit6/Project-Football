const express = require("express");
const router = express.Router();
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("../Controllers/ticketController");
const { protect, adminOnly } = require("../Modelware/authmodelware");

// Routes for ticket operations
router.post("/", protect, adminOnly, createTicket); // Create a ticket
router.get("/", protect, adminOnly, getAllTickets); // Get all tickets
router.get("/:id", protect, adminOnly, getTicketById); // Get ticket by ID
router.put("/:id", protect, adminOnly, updateTicket); // Update ticket by ID
router.delete("/:id", protect, adminOnly, deleteTicket); // Delete ticket by ID

module.exports = router;
