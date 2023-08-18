const { Basket, BasketBook, Book } = require('../models/models'); // Import your models

exports.addToCart = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('User Object:', req.user);
    const { bookId, quantity } = req.body; 
    const userId = req.user.id;
    
    let basket = await Basket.findOne({ where: { userId } });
    if (!basket) {
      basket = await Basket.create({ userId });
    }

    const basketBook = await BasketBook.create({
      basketId: basket.id,
      bookId,
      quantity, 
      
    });

    res.status(201).json(basketBook);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { basketId } = req.params;

    await BasketBook.destroy({
      where: {
        id: basketId,
      },
    });

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const basket = await Basket.findOne({
      where: { userId },
      include: [{ model: BasketBook, include: [Book] }], // Assuming you have a Book model
    });

    if (!basket) {
      return res.status(200).json({});
    }

    res.status(200).json(basket);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    await BasketBook.update(
      { quantity }, 
      { where: { id: cartItemId } }
    );

    res.status(200).json({ message: 'Item quantity updated' });
  } catch (error) {
    console.error('Error updating item quantity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};