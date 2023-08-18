const Router = require('express');
const router = new Router();
const BookRouter = require('./BookRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/book', BookRouter);
router.use('/cart', cartRouter);

module.exports = router;
