const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Assuming you have a db.js file to connect to MongoDB
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

dotenv.config(); // Load environment variables
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use the authentication routes
app.use("/api/auth", authRoutes);

// Use the ticket routes
app.use("/api/tickets", ticketRoutes);

// Error-handling middleware for empty or invalid body
app.use((req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send("Empty or invalid JSON body");
  }
  next(); // Proceed to the next middleware
});

// Error-handling middleware for invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Bad JSON:", err.message);
    return res.status(400).send({ error: "Invalid JSON payload" });
  }
  next();
});

// Example endpoint for logging headers and body
app.post("/endpoint", (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  res.send("Received");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
