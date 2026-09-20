const express = require('express');
const router = express.Router();
const orderController = require('../Apis/Controllers/orderController');

router.post('/', orderController.create);
router.get('/', orderController.getByUser);
router.get('/track/:orderNumber', orderController.track);

module.exports = router;
