import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: missing token.' });
  }

  const token = tokenHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: invalid token.' });
  }
};
