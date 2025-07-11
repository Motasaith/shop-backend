const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const initializeAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected:', mongoose.connection.host);

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@shop.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log('Admin email: admin@shop.com');
      console.log('Admin password: admin123');
    } else {
      // Create admin user only if it doesn't exist
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@shop.com',
        password: 'admin123',
        role: 'admin',
      });

      await adminUser.save();
      console.log('Admin user created successfully!');
      console.log('Admin email: admin@shop.com');
      console.log('Admin password: admin123');
    }

    // Display current user count
    const userCount = await User.countDocuments();
    console.log(`Total users in database: ${userCount}`);

    process.exit(0);
  } catch (error) {
    console.error('Error initializing admin:', error);
    process.exit(1);
  }
};

initializeAdmin();
