
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Assuming you have a db.js file to connect to MongoDB
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const footballers = require ('./routes/footballerRoutes');
// const { protect, adminOnly } = require('./Modelware/authmodelware'); 
const matchRoute = require('./routes/matchRoute')

dotenv.config();

const app = express();
app.use(express.json());
connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use((req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send("Empty or invalid JSON body");
  }
  next(); // Proceed to the next middleware
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Bad JSON:", err.message);
    return res.status(400).send({ error: "Invalid JSON payload" });
  }
  next();
});
app.post("/endpoint", (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  res.send("Received");
});

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api', matchRoute);
app.use('/api/footballers',footballers)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
