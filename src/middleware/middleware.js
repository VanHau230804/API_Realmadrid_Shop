import jwt from 'jsonwebtoken';
const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('token', token);
    if (token) {
      const token = token.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'token khong hop le' });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json('Bạn chưa xác thực !');
    }
  }
};
