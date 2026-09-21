require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://127.0.0.1:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Session ───────────────────────────────────────────────────────────────────
// Sessions are stored in MongoDB so they survive server restarts.
// The session is set up after connection is established (see connectToDatabase).
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'khaadi_store_secret_key_2024',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase',
      collectionName: 'sessions',
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);

// ── Health routes ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API is running' });
});

app.get('/health', async (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  let counts = null;
  if (connected && mongoose.connection.db) {
    const db = mongoose.connection.db;
    counts = {
      users: await db.collection('users').countDocuments(),
      orders: await db.collection('orders').countDocuments(),
      products: await db.collection('products').countDocuments(),
    };
  }
  res.json({
    ok: true,
    db: connected ? 'connected' : 'disconnected',
    database: mongoose.connection.db?.databaseName || null,
    counts,
    session: req.session?.id ? 'active' : 'none',
  });
});

// ── Session info route (for debugging) ────────────────────────────────────────
app.get('/me', (req, res) => {
  if (req.session?.userId) {
    return res.json({ loggedIn: true, userId: req.session.userId });
  }
  return res.json({ loggedIn: false });
});

// ── Logout route ──────────────────────────────────────────────────────────────
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed.' });
    res.clearCookie('connect.sid');
    return res.json({ ok: true, message: 'Logged out.' });
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/students', require('./Routes/studRoutes'));
app.use('/products', require('./Routes/productRoutes'));
app.use('/users',    require('./Routes/userRoutes'));
app.use('/orders',   require('./Routes/orderRoutes'));
app.use('/admin',    require('./Routes/adminRoutes'));

// ── DB connection + seed, then start server ───────────────────────────────────
const PORT = process.env.PORT || 9000;
require('./Database/connection').connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Failed to connect to database:', err);
  process.exit(1);
});

// Export app for Vercel serverless
module.exports = app;
