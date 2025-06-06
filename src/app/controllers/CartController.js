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
    const cart = await Cart.find({ userId: req.params.id }).populate('userId'); // Nếu muốn populate thông tin user

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching cart'
    });
  }
};
export const addCart = async (req, res) => {
  try {
    const data = await Cart(req.body).save();
    res.status(201).json({
      message: 'cart created successfully',
      cart: data
    });
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Failed to create cart' });
  }
};
export const updateCart = async (req, res) => {
  const { cartId, itemId } = req.params;
  const { quantity } = req.body;
  try {
    // 1. Tìm giỏ hàng bằng _id
    const cart = await Cart.findById(cartId);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    // 2. Tìm item bằng _id
    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    // 3. Cập nhật số lượng
    item.quantity = quantity;
    // 4. Lưu vào database
    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteCartByIdUser = async (req, res) => {
  try {
    const data = await Cart.deleteOne({ userId: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteCartById = async (req, res) => {
  try {
    const data = await Cart.deleteOne({ _id: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
