// seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js"; // adjust path

dotenv.config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const adminExists = await User.findOne({ email: "admin@example.com" });
  if (!adminExists) {
    await User.create({
      firstname: "Admin",
      lastname: "User",
      email: "admin@example.com",
      password: "Admin@123", // hashed in model pre-save hook
      isAdmin: true
    });
    console.log("Admin user created");
  } else {
    console.log("Admin already exists");
  }
  mongoose.disconnect();
};

seedAdmin();