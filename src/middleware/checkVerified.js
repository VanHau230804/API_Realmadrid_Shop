import User from '../models/Account.js';

export const checkVerified = async (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return res.status(400).json({ message: 'Thiếu token trong query.' });
  }
  try {
    // Tìm người dùng có token này và token còn hạn
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() } // kiểm tra hạn sử dụng
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: 'Email đã được xác minh trước đó.' });
    }
    req.userToVerify = user; // gắn user để dùng trong controller
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Lỗi máy chủ.', error: err.message });
  }
};
