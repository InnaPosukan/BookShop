const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/registration', UserController.registratiion)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router