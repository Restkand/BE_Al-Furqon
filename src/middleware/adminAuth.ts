import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../models/prisma';
import { ApiResponse } from '../utils/response';

interface JwtPayload {
  userId: string;
  username: string;
  role: string;
  permissions: string[];
}

declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string;
        username: string;
        role: string;
        permissions: string[];
      };
    }
  }
}

/**
 * Middleware untuk autentikasi admin
 */
export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json(
        ApiResponse.error('Access token required', 401)
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!token) {
      return res.status(401).json(
        ApiResponse.error('Invalid token format', 401)
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
    
    // Check if user exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        permissions: true,
        isActive: true,
        lastLogin: true
      }
    });

    if (!user || !user.isActive) {
      return res.status(401).json(
        ApiResponse.error('User not found or inactive', 401)
      );
    }

    // Check if user has admin role
    if (!['super_admin', 'admin', 'editor'].includes(user.role)) {
      return res.status(403).json(
        ApiResponse.error('Access denied. Admin role required', 403)
      );
    }

    // Add admin info to request
    req.admin = {
      id: user.id,
      username: user.username,
      role: user.role,
      permissions: user.permissions as string[]
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json(
        ApiResponse.error('Invalid token', 401)
      );
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json(
        ApiResponse.error('Token expired', 401)
      );
    }

    console.error('Admin auth error:', error);
    return res.status(500).json(
      ApiResponse.error('Authentication error', 500)
    );
  }
};

/**
 * Middleware untuk otorisasi berdasarkan role
 */
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.admin) {
      return res.status(401).json(
        ApiResponse.error('Authentication required', 401)
      );
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json(
        ApiResponse.error(`Access denied. Required roles: ${roles.join(', ')}`, 403)
      );
    }

    next();
  };
};

/**
 * Middleware untuk otorisasi berdasarkan permission
 */
export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.admin) {
      return res.status(401).json(
        ApiResponse.error('Authentication required', 401)
      );
    }

    if (!req.admin.permissions.includes(permission) && req.admin.role !== 'super_admin') {
      return res.status(403).json(
        ApiResponse.error(`Access denied. Required permission: ${permission}`, 403)
      );
    }

    next();
  };
};

/**
 * Middleware khusus untuk super admin
 */
export const requireSuperAdmin = requireRole(['super_admin']);

/**
 * Middleware untuk admin dan super admin
 */
export const requireAdmin = requireRole(['super_admin', 'admin']);

/**
 * Middleware untuk semua role admin (termasuk editor)
 */
export const requireAnyAdmin = requireRole(['super_admin', 'admin', 'editor']);
