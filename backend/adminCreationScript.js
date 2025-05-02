const mongoose = require('mongoose');
const Admin = require('./models/Admin'); // Correct model
require('dotenv').config(); // Still needed for ADMIN credentials

const SALT_ROUNDS = 10;

// Hardcoded MongoDB URI
const mongoUri = 'mongodb://localhost/projectdb';

// Admin credentials from .env
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

async function createAdmin() {
  try {
    await mongoose.connect(mongoUri);

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin already exists!');
      return;
    }

    const newAdmin = new Admin({
      email: adminEmail,
      password: adminPassword
    });

    await newAdmin.save();
    console.log('Admin user created successfully!');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
