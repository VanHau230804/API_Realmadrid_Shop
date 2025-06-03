import Order from '../../models/Order.js';
import Account from '../../models/Account.js';
import { sendOrderEmail } from '../../service/emailService.js';
export const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    const userId = newOrder.user._id;
    const { fullName, address, phone } = newOrder.shippingInfo;
    await Account.findByIdAndUpdate(userId, {
      fullName,
      address,
      phone
    });
    await sendOrderEmail(newOrder.shippingInfo.email, newOrder);
    res.status(201).json({
      message: 'Đặt hàng thành công!',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ message: 'Tạo đơn hàng thất bại' });
  }
};
export const confirmOrderByEmail = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    console.log('🔍 orderId:', orderId);

    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: 'Không tìm thấy đơn hàng' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: 'Đơn hàng đã được xử lý hoặc xác nhận'
      });
    }

    order.status = 'shipping';
    await order.save();

    return res.status(200).json({
      success: true,
      message: 'Xác nhận đơn hàng thành công! Đơn hàng đang được giao.'
    });
  } catch (error) {
    console.error('❌ Lỗi xác nhận đơn hàng:', error);
    return res.status(500).json({ success: false, error: error.message });
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
