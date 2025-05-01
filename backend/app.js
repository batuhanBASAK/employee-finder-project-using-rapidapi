const express = require('express');
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const jwt = require("jsonwebtoken");

// Middleware
app.use(cors());
app.use(bodyParser.json());

const profileInfoAPI = require('./profileInfo');
const searchPeopleAPI = require('./searchPeople');

require('dotenv').config()
const PORT = process.env.PORT

// In-memory mock user storage, for testing
const users = [];
// Hardcoded admin account for testing
const admin = { email: "admin@example.com", password: "admin123" };

// Utility functions for profile and people search
const getPersonProfileInfo = async (username) => {
  try {
    const response = await profileInfoAPI.getResponse(username);
    const data = response.data;
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      headline: data.headline,
      summary: data.summary,
      country: data.geo.country,
      city: data.geo.city,
      countryCode: data.geo.countryCode,
    };
  } catch (err) {
    console.error(`Failed to fetch profile for ${username}:`, err);
    return null;
  }
};

const getSearchPeopleData = async (keywords) => {
  try {
    const response = await searchPeopleAPI.getResponse(keywords);
    return response.data.data;
  } catch (err) {
    console.error(`Failed during searching people`, err);
    return null;
  }
};

const extractPeoplesUsername = (data) => {
  const usernameList = [];
  if (data?.items) {
    data.items.forEach(person => {
      usernameList.push(person.username);
    });
  }
  return usernameList;
};

const searchAndGetPeopleInfo = async (keywords) => {
  const data = await getSearchPeopleData(keywords);
  const usernameList = extractPeoplesUsername(data);

  const peopleInfoList = [];
  for (const username of usernameList) {
    const person = await getPersonProfileInfo(username);
    if (person) peopleInfoList.push(person);
  }

  return peopleInfoList;
};

// Sign up route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required." });

  const existingUser = users.find(user => user.email === email);
  if (existingUser)
    return res.status(409).json({ message: "User already exists." });

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User registered successfully.", token });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login route for regular users
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (!user)
    return res.status(401).json({ message: "Invalid credentials." });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid credentials." });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: "Login successful.", token });
});

// Admin login route
app.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  // Check if it's a pseudo admin login
  if (email === admin.email && password === admin.password) {
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ message: "Admin login successful.", token });
  } else {
    return res.status(401).json({ message: "Invalid admin credentials." });
  }
});

// Authenticate Token middleware
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

// Admin-specific route (example)
const authenticateAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Admin profile route (for testing)
app.get("/admin-profile", authenticateToken, authenticateAdmin, (req, res) => {
  res.json({ message: "Welcome to the admin panel!", email: req.user.email });
});

// User profile route
app.get("/user-profile", authenticateToken, (req, res) => {
  const user = users.find(u => u.email === req.user.email);
  if (!user) return res.status(404).json({ message: "User not found." });
  res.json({ email: user.email });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
