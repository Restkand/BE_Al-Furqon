import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/response';

/**
 * Global error handler middleware
 */
export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  console.error('💥 Error occurred:', error);

  // Default error
  let statusCode = 500;
  let message = 'Terjadi kesalahan server internal';
  let errorDetails = null;

  // Prisma errors
  if (error.code === 'P2002') {
    statusCode = 400;
    message = 'Data sudah ada';
    errorDetails = 'DUPLICATE_ENTRY';
  } else if (error.code === 'P2025') {
    statusCode = 404;
    message = 'Data tidak ditemukan';
    errorDetails = 'NOT_FOUND';
  } else if (error.code === 'P2003') {
    statusCode = 400;
    message = 'Violasi constraint foreign key';
    errorDetails = 'FOREIGN_KEY_CONSTRAINT';
  }

  // Validation errors
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Data tidak valid';
    errorDetails = error.details?.map((detail: any) => detail.message).join(', ');
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token tidak valid';
    errorDetails = 'INVALID_TOKEN';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token sudah kadaluarsa';
    errorDetails = 'EXPIRED_TOKEN';
  }

  // CORS errors
  if (error.message.includes('CORS') || error.message.includes('Not allowed by CORS')) {
    statusCode = 403;
    message = 'CORS policy violation';
    errorDetails = 'CORS_ERROR';
  }

  // Rate limit errors
  if (error.message.includes('Too many requests')) {
    statusCode = 429;
    message = 'Terlalu banyak permintaan';
    errorDetails = 'RATE_LIMIT_EXCEEDED';
  }

  // Custom error status
  if (error.statusCode) {
    statusCode = error.statusCode;
  }

  // Custom error message
  if (error.message && !error.code) {
    message = error.message;
  }

  const response = ApiResponse.error(message, errorDetails, statusCode);
  
  res.status(statusCode).json(response);
}
