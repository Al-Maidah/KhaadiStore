const mongoose = require('mongoose');
const { seedProducts } = require('./seedProducts');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase';

async function connectToDatabase() {
  await mongoose.connect(MONGO_URI, { dbName: 'myDatabase' });
  const db = mongoose.connection.db;
  console.log('✅ Connected to MongoDB');
  console.log('   Host:', mongoose.connection.host);
  console.log('   Database:', db.databaseName);
  await seedProducts();
  const counts = {
    users: await db.collection('users').countDocuments(),
    orders: await db.collection('orders').countDocuments(),
    products: await db.collection('products').countDocuments(),
  };
  console.log('   Collections:', counts);
}

module.exports = { connectToDatabase };
