// Run with: npm run seed
// Creates a default admin account (CHANGE THE PASSWORD IMMEDIATELY AFTER FIRST LOGIN)
// and a couple of sample ads, so the dashboard isn't empty on first run.

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");
const Ad = require("../models/Ad");

async function seed() {
  await connectDB();

  const adminEmail = "admin@apexdigitalworkszw.com";
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    await User.create({
      fullName: "APEXDIGITALWORKSZW Admin",
      email: adminEmail,
      password: "ChangeMe123!",
      role: "admin",
      isVerified: true,
    });
    console.log(`✅ Admin user created: ${adminEmail} / ChangeMe123!`);
    console.log("⚠️  Please log in and change this password immediately.");
  } else {
    console.log("ℹ️  Admin user already exists, skipping.");
  }

  const adCount = await Ad.countDocuments();
  if (adCount === 0) {
    await Ad.insertMany([
      {
        title: "Get 10% Off Your First Website Project",
        type: "banner",
        placement: "home_hero",
        targetUrl: "/services/website-development",
        isActive: true,
      },
      {
        title: "Need CCTV or Starlink Installed? Book Now",
        type: "banner",
        placement: "services_top",
        targetUrl: "/services/tech-installations",
        isActive: true,
      },
    ]);
    console.log("✅ Sample ads created.");
  } else {
    console.log("ℹ️  Ads already exist, skipping.");
  }

  console.log("🌱 Seeding complete.");
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
