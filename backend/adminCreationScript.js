const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const SALT_ROUNDS = 10;

// Admin credentials from .env
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

async function createAdmin() {
  try {
    await mongoose.connect("mongodb://localhost/projectdb");

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

(async () => {
  await createAdmin();
})();
