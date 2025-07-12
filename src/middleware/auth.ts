import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const auth = (req: AuthRequest, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError(401, 'Authentication required');
    }

    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError(401, 'Token has expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError(401, 'Invalid token');
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const adminAuth = (req: AuthRequest, _res: Response, next: NextFunction): void => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }
    
    if (req.user.role !== 'admin') {
      throw new AppError(403, 'Admin access required');
    }
    
    next();
  } catch (error) {
    next(error);
  }
};
