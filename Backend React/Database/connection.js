const mongoose = require('mongoose');
const { seedProducts } = require('./seedProducts');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase';

async function connectToDatabase() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB →', MONGO_URI);
  await seedProducts();
}

module.exports = { connectToDatabase };
