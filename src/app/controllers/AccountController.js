import Account from '../../models/Account.js';
import bcrypt from 'bcrypt';

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
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({ message: 'Email tồn tại' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = new Account({
      email,
      username,
      password: hashedPassword
    });
    await newAccount.save();
    res.status(201).json({ message: 'Account tạo thành công' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const user = await Account.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mật khẩu' });
    }
    if (user && isMatch) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false, // khi deploy nên chuyển sang true
        samSite: 'strict'
      });
      const { password, ...dataUser } = user._doc; // Không trả về mật khẩu nhầm tăng tính bảo mật
      res.status(200).json({ ...dataUser, accessToken });
    }
    res.status(200).json({ message: 'Đăng nhập thành công', user });
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
