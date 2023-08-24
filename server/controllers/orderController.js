const { Order } = require('../models/models');

class OrderController {
  async createOrder(req, res) {
    try {
      const { first_name, last_name, phone_number, address, cartDataId } = req.body;
      const newOrder = await Order.create({
        firstName: first_name,
        lastName: last_name,
        phoneNumber: phone_number,
        address: address,
        basketId: cartDataId, // Store cartDataId in the basketid field
      });
      
      return res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      return res.status(500).json({ error: 'An error occurred while creating the order.' });
    }
  }
}

module.exports = new OrderController();
