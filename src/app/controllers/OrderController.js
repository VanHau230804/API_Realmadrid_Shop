import Order from '../../models/Order.js';
export const createOrder = async (req, res) => {
  try {
    const { user, items, shippingInfo, totalPrice, note } = req.body;
    if (!user || !items || !shippingInfo || !totalPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newOrder = new Order({
      user,
      items,
      shippingInfo,
      totalPrice,
      status: 'pending',
      note
    });
    await newOrder.save();
    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};
