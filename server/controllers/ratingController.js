const { Rating, Book  } = require('../models/models');

class RatingController {
    async create(req, res) {
        const { bookId, ratingValue, userId } = req.body;
        console.log("Received data:", bookId, ratingValue, userId);
    
        try {
            const rating = await Rating.create({ rate: ratingValue, bookId, userId });
            console.log("Rating created:", rating);
            return res.json(rating);
        } catch (error) {
            console.error("Error creating rating:", error);
            res.status(500).json({ message: "Error creating rating" });
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
}

module.exports = new RatingController();
