import Cart from '../../models/Cart.js';
import Category from '../../models/Category.js';
export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate();
    if (carts.length < 0) {
      return res.status(404).json({ message: 'No carts found' });
    }
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id }).populate(
      'userId'
    ); // Nếu muốn populate thông tin user

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching cart'
    });
  }
};
