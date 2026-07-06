import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to DB");

  const existing = await User.findOne({ email: ADMIN_EMAIL });

  if (existing) {
    existing.isAdmin = true;
    await existing.save();
    console.log("Existing user promoted to admin:", existing.email);
  } else {
    const admin = await User.create({
      name: "Admin",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      isAdmin: true,
      role: "Admin",
      title: "Administrator",
    });
    console.log("New admin created:", admin.email);
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
}); 