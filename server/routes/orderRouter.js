const express = require('express');
const orderController = require('../controllers/orderController'); // Подставьте правильный путь к контроллеру

const router = express.Router();

router.post('/', orderController.createOrder);

module.exports = router;

