const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const Product = require("./models/Product");
const User = require("./models/User");
const sampleProducts = require("./seedData");

dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log("Existing data cleared");

    // Create admin user
    const adminUser = new User({
      name: "Admin User",
      email: "admin@shop.com",
      password: "admin123",
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created");
    console.log("Admin login: admin@shop.com");
    console.log("Admin password: admin123");

    // Create regular test user
    const testUser = new User({
      name: "Test User",
      email: "test@shop.com",
      password: "test123",
      role: "user",
    });

    await testUser.save();
    console.log("Test user created");

    // Add sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`${products.length} products added to database`);

    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
