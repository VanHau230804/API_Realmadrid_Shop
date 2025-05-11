import jwt from 'jsonwebtoken';

export const generateAccessToken = user => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: '1d' }
  );
};
export const generateRefreshToken = user => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: '7d' }
  );
};
