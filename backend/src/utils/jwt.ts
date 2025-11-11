import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'fallback-secret';

export const signToken = (payload: object) => {
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret) as any;
};