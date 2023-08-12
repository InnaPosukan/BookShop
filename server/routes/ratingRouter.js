const express = require('express');
const router = express.Router(); // Проверьте, что вы правильно создаете экземпляр роутера
const ratingController = require('../controllers/ratingController');
router.post('/', ratingController.create)
router.get('/',  ratingController.getAll)

module.exports = router