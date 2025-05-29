import Order from '../../models/Order.js';
export const createOrder = async (req, res) => {
  try {
    const data = await Order(req.body).save();
    res.status(201).json({
      message: 'Order created successfully',
      order: data
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};
export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate('user');
    if (orders.length < 1) {
      return res.status(404).json({ message: 'No orders found' });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
export const getOrderByIdUser = async (req, res) => {
  try {
    const order = await Order.find({ user: req.params.id }).populate('user'); // Nếu muốn populate thông tin user

    if (!order) {
      return res.status(404).json({ message: 'order not found for this user' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching order'
    });
  }
};
export const deleteOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
