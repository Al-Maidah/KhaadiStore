const Order = require('../Models/orderModel');
const { sendOrderConfirmation } = require('../../utils/emailService');

// POST /orders
async function create(req, res) {
  try {
    const { userId, email, newsletter, shipping, paymentMethod, items, subtotal, shippingCost, total } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required to place an order.' });
    }

    const order = await Order.create({
      userId, email, newsletter, shipping,
      paymentMethod, items, subtotal, shippingCost, total,
    });

    // Send confirmation email (non-blocking — order is already created)
    sendOrderConfirmation(order.toObject());

    return res.status(201).json(order);
  } catch (err) {
    console.error('create order error:', err);
    return res.status(500).json({ message: err.message || 'Failed to place order.' });
  }
}

// GET /orders?userId=<id>  OR  ?email=<email>
async function getByUser(req, res) {
  try {
    const { userId, email } = req.query;
    if (!userId && !email) {
      return res.status(400).json({ message: 'Provide userId or email query parameter.' });
    }
    const filter = userId ? { userId } : { email: email.toLowerCase() };
    const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
    return res.status(200).json(orders);
  } catch (err) {
    console.error('getByUser orders error:', err);
    return res.status(500).json({ message: err.message });
  }
}

// GET /orders/track/:orderNumber
async function track(req, res) {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber }).lean();
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    return res.status(200).json(order);
  } catch (err) {
    console.error('track order error:', err);
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { create, getByUser, track };
