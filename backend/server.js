const express = require("express");
const cors = require("cors");

const app = express();

// Import routes
const ticketRoutes = require("./routes/tickets");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tickets", ticketRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Support CRM API is running...");
});

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});