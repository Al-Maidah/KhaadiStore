const express = require('express');
const router  = express.Router();
const {
  login, logout, check,
  getStats, getOrders, getCustomers,
  updateOrderStatus, requireAdmin,
} = require('../Apis/Controllers/adminController');

// Public
router.post('/login',  login);
router.post('/logout', logout);
router.get('/check',   check);

// Protected (admin session required)
router.get('/stats',                  requireAdmin, getStats);
router.get('/orders',                 requireAdmin, getOrders);
router.get('/customers',              requireAdmin, getCustomers);
router.put('/orders/:id/status',      requireAdmin, updateOrderStatus);

module.exports = router;
