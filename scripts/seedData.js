const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Sample products based on your existing mock data
const sampleProducts = [
  {
    title: 'Wireless Headphones',
    description: 'High quality wireless headphones with noise cancellation.',
    price: 299.99,
    category: 'electronics',
    image: 'https://via.placeholder.com/300',
    stock: 15,
    featured: true
  },
  {
    title: 'Smartwatch',
    description: 'Stylish smartwatch with multiple fitness features.',
    price: 199.99,
    category: 'electronics',
    image: 'https://via.placeholder.com/300',
    stock: 20,
    featured: true
  },
  {
    title: 'Running Shoes',
    description: 'Comfortable running shoes for all-day wear.',
    price: 149.99,
    category: 'clothing',
    image: 'https://via.placeholder.com/300',
    stock: 25,
    featured: false
  },
  {
    title: 'Leather Wallet',
    description: 'Genuine leather wallet with multiple card slots.',
    price: 79.99,
    category: 'accessories',
    image: 'https://via.placeholder.com/300',
    stock: 30,
    featured: false
  },
  {
    title: 'Sunglasses',
    description: 'UV protection sunglasses with polarized lenses.',
    price: 59.99,
    category: 'accessories',
    image: 'https://via.placeholder.com/300',
    stock: 40,
    featured: true
  },
  {
    title: 'Bluetooth Speaker',
    description: 'Portable wireless speaker with excellent sound quality.',
    price: 89.99,
    category: 'electronics',
    image: 'https://via.placeholder.com/300',
    stock: 18,
    featured: false
  },
  {
    title: 'Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring.',
    price: 129.99,
    category: 'electronics',
    image: 'https://via.placeholder.com/300',
    stock: 22,
    featured: true
  },
  {
    title: 'Gaming Mouse',
    description: 'High-precision gaming mouse with customizable buttons.',
    price: 69.99,
    category: 'electronics',
    image: 'https://via.placeholder.com/300',
    stock: 35,
    featured: false
  }
];

// Sample admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin'
};

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Existing data cleared');

    // Create admin user
    const createdAdmin = await User.create(adminUser);
    console.log('Admin user created:', createdAdmin.email);

    // Create products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`${createdProducts.length} products created`);

    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seeding
connectDB().then(() => {
  seedData();
});
