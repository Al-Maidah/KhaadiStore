const User    = require('../Models/userModel');
const Order   = require('../Models/orderModel');
const Product = require('../Models/productModel');

// ── Admin credentials come from env vars ──────────────────────────────────────
const ADMIN_ID       = () => process.env.ADMIN_ID       || 'KHAADI_ADMIN_001';
const ADMIN_EMAIL    = () => (process.env.ADMIN_EMAIL    || 'almaidahnadeem06@gmail.com').toLowerCase();
const ADMIN_PASSWORD = () => process.env.ADMIN_PASSWORD || 'KhaadiAdmin@2024';

// ── Middleware: protect admin routes ─────────────────────────────────────────
function requireAdmin(req, res, next) {
  if (!req.session?.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized. Admin access required.' });
  }
  next();
}

// POST /admin/login
async function login(req, res) {
  try {
    const adminId  = String(req.body.adminId || '').trim();
    const email    = String(req.body.email || '').trim().toLowerCase();
    const password = req.body.password;

    if (!adminId || !email || !password) {
      return res.status(400).json({ message: 'adminId, email and password are all required.' });
    }

    if (
      adminId    !== ADMIN_ID()       ||
      email      !== ADMIN_EMAIL()    ||
      password   !== ADMIN_PASSWORD()
    ) {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }

    req.session.isAdmin = true;
    req.session.adminId = adminId;

    return res.json({ ok: true, message: 'Admin logged in successfully.' });
  } catch (err) {
    console.error('admin login error:', err);
    return res.status(500).json({ message: err.message });
  }
}

// POST /admin/logout
function logout(req, res) {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed.' });
    res.clearCookie('connect.sid');
    return res.json({ ok: true, message: 'Admin logged out.' });
  });
}

// GET /admin/check — verify session is still valid
function check(req, res) {
  if (req.session?.isAdmin) {
    return res.json({ ok: true, adminId: req.session.adminId });
  }
  return res.status(401).json({ ok: false });
}

// GET /admin/stats — dashboard overview
async function getStats(req, res) {
  try {
    const [totalOrders, totalCustomers, orders] = await Promise.all([
      Order.countDocuments(),
      User.countDocuments(),
      Order.find().lean(),
    ]);

    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    // Today's figures
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const todayOrders = orders.filter(o => new Date(o.createdAt) >= todayStart);
    const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    // Yesterday
    const yestStart = new Date(todayStart); yestStart.setDate(yestStart.getDate() - 1);
    const yestOrders = orders.filter(o => {
      const t = new Date(o.createdAt);
      return t >= yestStart && t < todayStart;
    });
    const yestRevenue = yestOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    // This month
    const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);
    const monthOrders = orders.filter(o => new Date(o.createdAt) >= monthStart);
    const monthRevenue = monthOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    // Last 7 days bar chart data
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date(); dayStart.setHours(0, 0, 0, 0); dayStart.setDate(dayStart.getDate() - i);
      const dayEnd   = new Date(dayStart); dayEnd.setDate(dayEnd.getDate() + 1);
      const dayOrds  = orders.filter(o => { const t = new Date(o.createdAt); return t >= dayStart && t < dayEnd; });
      last7.push({
        label:   dayStart.toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: dayOrds.reduce((s, o) => s + (o.total || 0), 0),
        orders:  dayOrds.length,
      });
    }

    // Status breakdown
    const statusBreakdown = orders.reduce((acc, o) => {
      const s = o.status || 'placed';
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10).lean();

    return res.json({
      totalOrders,
      totalRevenue,
      totalCustomers,
      todayOrders: todayOrders.length,
      todayRevenue,
      yestOrders:  yestOrders.length,
      yestRevenue,
      monthOrders: monthOrders.length,
      monthRevenue,
      last7,
      statusBreakdown,
      recentOrders,
    });
  } catch (err) {
    console.error('admin stats error:', err);
    return res.status(500).json({ message: err.message });
  }
}

// GET /admin/orders
async function getOrders(req, res) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// GET /admin/customers
async function getCustomers(req, res) {
  try {
    const customers = await User.find().sort({ createdAt: -1 }).lean();
    return res.json(customers);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// PUT /admin/orders/:id/status
async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;
    const VALID = ['placed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!VALID.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Use one of: ${VALID.join(', ')}` });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { returnDocument: 'after' }
    );
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    return res.json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// ── Product CRUD ─────────────────────────────────────────────────────────────

// GET /admin/products?collection=xxx
async function getProducts(req, res) {
  try {
    const { collection } = req.query;
    const filter = collection ? { collections: collection } : {};
    const products = await Product.find(filter).sort({ id: 1 }).lean();
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// POST /admin/products
async function createProduct(req, res) {
  try {
    const last = await Product.findOne().sort({ id: -1 }).lean();
    const newId = (last?.id || 0) + 1;
    const product = await Product.create({ ...req.body, id: newId });
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// PUT /admin/products/:id   (MongoDB _id)
async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// DELETE /admin/products/:id   (MongoDB _id)
async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    return res.json({ ok: true, deleted: req.params.id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  login, logout, check,
  getStats, getOrders, getCustomers, updateOrderStatus,
  getProducts, createProduct, updateProduct, deleteProduct,
  requireAdmin,
};
