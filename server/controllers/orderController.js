const { Order, Basket, BasketBook, Book } = require('../models/models');

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
  async getOrderHistory(req, res) {
    try {
      const userId = req.user.id; 
      
      const orderHistory = await Order.findAll({
        include: {
          model: Basket,
          where: { userId },
          include: [
            {
              model: BasketBook,
              include: [Book],
            },
          ],
        },
      });

      return res.status(200).json(orderHistory);
    } catch (error) {
      console.error('Error fetching order history:', error);
      return res.status(500).json({ error: 'An error occurred while fetching order history.' });
    }
  }

async getAllOrders(req, res) {
  try {
    const allOrders = await Order.findAll({
      include: {
        model: Basket,
        include: [
          {
            model: BasketBook,
            include: [Book],
          },
        ],
      },
    });

    return res.status(200).json(allOrders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return res.status(500).json({ error: 'An error occurred while fetching all orders.' });
  }
}
async updateOrderStatus(req, res) {
  const { orderId } = req.params;
  const { newStatus } = req.body;

  try {
    const updatedOrder = await Order.update(
      { status: newStatus },
      { where: { id: orderId } }
    );

    if (updatedOrder[0] === 0) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    return res.status(200).json({ message: `Order status updated to "${newStatus}"` });
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ error: 'An error occurred while updating the order status.' });
  }
}

}

module.exports = new OrderController();
