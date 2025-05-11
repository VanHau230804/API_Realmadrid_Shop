import jwt from 'jsonwebtoken';
const middlewareController = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('token :', authHeader);
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      console.log('token2 :', token);

      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
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
export default middlewareController;
