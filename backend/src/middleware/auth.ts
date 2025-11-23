import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../schemas/zod';

interface AuthRequest extends Request {
  user?: { id: string; role: string; email: string };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Token requis',
      error: 'Unauthorized',
    } as ErrorResponse);
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (err: Error) => {
    if (err) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Token invalide',
        error: 'Forbidden',
      } as ErrorResponse);
    }
    req.user = user as { id: string; role: string; email: string };
    next();
  });
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Rôle insuffisant',
        error: 'Forbidden',
      } as ErrorResponse);
    }
    next();
  };
};