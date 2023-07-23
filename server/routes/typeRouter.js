const express = require('express');
const router = express.Router(); // Проверьте, что вы правильно создаете экземпляр роутера
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/', typeController.create)
router.get('/',  typeController.getAll)

module.exports = router