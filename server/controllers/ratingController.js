const { Rating, Book } = require('../models/models');

class RatingController {
    async create(req, res) {
        const { bookId, ratingValue, userId } = req.body;

        try {
            const roundedRating = Math.round(ratingValue); // Округляем рейтинг до целого числа
            const rating = await Rating.create({ rate: roundedRating, bookId, userId });

            // Вычисляем новый средний рейтинг для книги
            const newAverageRating = await Rating.findOne({
                attributes: [[Rating.sequelize.fn('AVG', Rating.sequelize.col('rate')), 'averageRating']],
                where: { bookId }
            });

            // Обновляем значение рейтинга в таблице books
            await Book.update({ rating: newAverageRating.dataValues.averageRating }, { where: { id: bookId } });

            return res.json(rating);
        } catch (error) {
            console.error("Error creating rating:", error);
            res.status(500).json({ message: "Error creating rating" });
        }
    }

    async getAverageRatingForBook(req, res) {
        const { bookId } = req.params;

        try {
            const averageRating = await Rating.findOne({
                attributes: [[Rating.sequelize.fn('AVG', Rating.sequelize.col('rate')), 'averageRating']],
                where: { bookId }
            });

            return res.json({ averageRating: averageRating.dataValues.averageRating });
        } catch (error) {
            console.error('Error fetching average rating:', error);
            return res.status(500).json({ message: 'An error occurred' });
        }
    }


    async getAll(req, res) {
        try {
            const ratings = await Rating.findAll();
            return res.json(ratings);
        } catch (error) {
            console.error('Error fetching ratings:', error);
            return res.status(500).json({ message: 'An error occurred' });
        }
    }
    async updateBookRating(req, res) {
        const { bookId } = req.params;
        const { newRating } = req.body;

        try {
            const rating = await Rating.findOne({
                where: { bookId }
            });

            if (!rating) {
                return res.status(404).json({ message: 'Rating not found' });
            }

            const roundedRating = Math.round(newRating); 
            rating.rate = roundedRating;
            await rating.save();

            const newAverageRating = await Rating.findOne({
                attributes: [[Rating.sequelize.fn('AVG', Rating.sequelize.col('rate')), 'averageRating']],
                where: { bookId }
            });

            await Book.update({ rating: newAverageRating.dataValues.averageRating }, { where: { id: bookId } });

            return res.json({ message: 'Rating updated successfully' });
        } catch (error) {
            console.error('Error updating rating:', error);
            return res.status(500).json({ message: 'An error occurred' });
        }
    }
}

module.exports = new RatingController();
