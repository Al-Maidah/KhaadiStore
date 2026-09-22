const express = require('express');
const router  = express.Router();
const {
  login, logout, check,
  getStats, getOrders, getCustomers, updateOrderStatus,
  getProducts, createProduct, updateProduct, deleteProduct,
  requireAdmin,
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

// Products CRUD
router.get('/products',         requireAdmin, getProducts);
router.post('/products',        requireAdmin, createProduct);
router.put('/products/:id',     requireAdmin, updateProduct);
router.delete('/products/:id',  requireAdmin, deleteProduct);

module.exports = router;
