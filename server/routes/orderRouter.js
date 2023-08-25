const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/history', authMiddleware, orderController.getOrderHistory); // Add this route for fetching order history
router.get('/all', authMiddleware, orderController.getAllOrders); 
router.patch('/status/:orderId', authMiddleware, orderController.updateOrderStatus);

module.exports = router;
