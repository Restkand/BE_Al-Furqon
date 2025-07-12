import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { responseHelper } from '../utils/responseHelper';
import { Prisma } from '@prisma/client';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { MulterError } from 'multer';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', {
    name: error instanceof Error ? error.name : 'Unknown',
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined
  });

  // Handle known application errors
  if (error instanceof AppError) {
    responseHelper(res, error.statusCode, error.message, null, error);
    return;
  }

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        responseHelper(res, 400, 'A record with this value already exists', null, error);
        break;
      case 'P2025':
        responseHelper(res, 404, 'Record not found', null, error);
        break;
      case 'P2014':
        responseHelper(res, 400, 'Invalid ID provided', null, error);
        break;
      case 'P2003':
        responseHelper(res, 400, 'Foreign key constraint failed', null, error);
        break;
      default:
        responseHelper(res, 500, 'Database error', null, error);
        break;
    }
    return;
  }

  // Handle JWT errors
  if (error instanceof JsonWebTokenError) {
    responseHelper(res, 401, 'Invalid token', null, error);
    return;
  }

  if (error instanceof TokenExpiredError) {
    responseHelper(res, 401, 'Token expired', null, error);
    return;
  }

  // Handle Multer errors
  if (error instanceof MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        responseHelper(res, 400, 'File is too large', null, error);
        break;
      case 'LIMIT_FILE_COUNT':
        responseHelper(res, 400, 'Too many files uploaded', null, error);
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        responseHelper(res, 400, 'Unexpected field', null, error);
        break;
      default:
        responseHelper(res, 400, 'File upload error', null, error);
        break;
    }
    return;
  }

  // Handle validation errors
  if (error instanceof Error && error.name === 'ValidationError') {
    responseHelper(res, 400, 'Validation error', null, error);
    return;
  }

  // Generic error handling
  responseHelper(
    res,
    500,
    'Internal server error',
    null,
    error instanceof Error ? error : new Error('Unknown error')
  );
};
