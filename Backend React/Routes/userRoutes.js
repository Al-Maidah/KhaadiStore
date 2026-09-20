const express = require('express');
const router = express.Router();
const userController = require('../Apis/Controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.put('/:id/cart', userController.saveCart);
router.put('/:id/wishlist', userController.saveWishlist);

module.exports = router;
