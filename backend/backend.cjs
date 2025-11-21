const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://tiffica:deepak%40tiffica@cluster0.80cwflc.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  city: String,
  createdAt: { type: Date, default: Date.now }
});

// Model
const Contact = mongoose.model("Contact", ContactSchema);

// API Route
app.post("/api/contact", async (req, res) => {
  try {
    await Contact.create(req.body);
    res.json({ message: "Contact details submitted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving data" });
  }
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

