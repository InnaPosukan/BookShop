const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.post('/', ratingController.create);

router.get('/', ratingController.getAll);

router.get('/average/:bookId', ratingController.getAverageRatingForBook);

router.patch('/:bookId/rating', ratingController.updateBookRating);


module.exports = router;
