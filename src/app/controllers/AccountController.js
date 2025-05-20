import Account from '../../models/Account.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { sendVerificationEmail } from '../../service/emailService.js';
import {
  generateAccessToken,
  generateRefreshToken
} from '../../service/jwtService.js';
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    if (accounts.length < 0) {
      return res.status(404).json({ message: 'No accounts found' });
    }
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const addAccount = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    // 1. Kiểm tra tài khoản đã tồn tại chưa
    const existingAccount = await Account.findOne({ email });
    // 2. Xử lý trường hợp email đã tồn tại
    if (existingAccount) {
      // Nếu tài khoản đã được xác nhận
      if (existingAccount.isVerified) {
        return res.status(400).json({
          message: 'Email này đã được đăng ký!'
        });
      }

      // Nếu tài khoản chưa xác nhận và token còn hạn
      const now = new Date();
      if (existingAccount.emailVerificationExpires > now) {
        return res.status(400).json({
          message:
            'Email đã được đăng ký nhưng chưa xác nhận. Vui lòng kiểm tra email'
        });
      }

      // Nếu token hết hạn, xóa tài khoản cũ
      await Account.deleteOne({ _id: existingAccount._id });
    }

    // 3. Tạo tài khoản mới
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24);

    const newAccount = new Account({
      email,
      username,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
      isVerified: false
    });

    await newAccount.save();
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác nhận.'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || 'Đã xảy ra lỗi khi đăng ký tài khoản'
    });
  }
};
export const verifyEmail = async (req, res) => {
  try {
    const user = req.userToVerify;
    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();
    return res.status(200).json({ message: 'Xác minh email thành công.' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Lỗi xác minh email.', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await Account.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }
    if (user.isVerified === false) {
      return res.status(400).json({ message: 'Tài khoản chưa được xác thực' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mật khẩu' });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    });
    const { password, ...dataUser } = user._doc;
    return res.status(200).json({ ...dataUser, accessToken }); // return để tránh gửi 2 response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const requestRefreshToken = async (req, res) => {
  // Take refresh token from user
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json('Bạn chưa được xác thực !');
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      console.log(err);
    }
    // Create new accessToken, refresh token
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false, // khi deploy nên chuyển sang true
      samSite: 'strict'
    });
    res.status(200).json({ accessToken: newAccessToken });
  });
};

export const deleteAccount = async (req, res) => {
  try {
    const data = await Account.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteAllAccounts = async (req, res) => {
  try {
    // Xóa tất cả các tài khoản trong collection
    const result = await Account.deleteMany({});
    res.status(200).json({
      message: `Đã xóa thành công ${result.deletedCount} tài khoản`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
