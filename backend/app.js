const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { searchAndGetPeopleInfo } = require('./rapidapi_linkedIn_scraper');
const User = require('./models/User'); // make sure this path matches where your User.js is
const Admin = require('./models/Admin'); // import the admin model

const SALT_ROUNDS = 10;
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost/projectdb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Sign up route
app.post("/signup", async (req, res) => {
  const { name, surname, email, company, phone, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required." });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({
      name,
      surname,
      email,
      company,
      phone,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User registered successfully.", token });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Login successful.", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Admin login
app.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ message: "Invalid admin credentials." });

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid admin credentials." });

    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ message: "Admin login successful.", token });
  } catch (err) {
    console.error("Error during admin login:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Middleware: authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied. No token." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token." });
    req.user = user;
    next();
  });
};

// Middleware: check admin role
const authenticateAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Admin-only route
app.get("/admin-profile", authenticateToken, authenticateAdmin, (req, res) => {
  res.json({ message: "Welcome to the admin panel!", email: req.user.email });
});

// User profile route
app.get("/user-profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route: Get all users (admin only)
app.get("/admin/users", authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});



app.post("/search-people", authenticateToken, async (req, res) => {
  const { keywords} = req.body;

  if (!keywords) {
    return res.status(400).json({ message: "Keywords are required." });
  }

  try {
    const filteredPeople = await searchAndGetPeopleInfo(keywords);
    if (filteredPeople.length === 0) {
      return res.status(404).json({ message: "No people found! Please try again" });
    }

    res.json({ filteredPeople });
  } catch (err) {
    console.error("Error fetching filtered people:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
