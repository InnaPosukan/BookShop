// cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, cartController.addToCart);
router.delete('/remove/:basketId', authMiddleware, cartController.removeFromCart);
router.get('/view',authMiddleware, cartController.getCart);
router.patch('/update/:cartItemId', cartController.updateCartItemQuantity);

module.exports = router;
