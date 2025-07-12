import { Request, Response, NextFunction, RequestHandler } from 'express';
import { responseHelper } from '../utils/responseHelper';

interface ValidationRule {
  required?: boolean;
  type?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
}

interface ValidationSchema {
  [key: string]: ValidationRule;
}

const validateField = (value: any, rules: ValidationRule): string | null => {
  if (rules.required && !value) {
    return 'Field is required';
  }

  if (value) {
    if (rules.type && typeof value !== rules.type) {
      return `Field must be of type ${rules.type}`;
    }

    if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
      return `Field must be at least ${rules.minLength} characters long`;
    }

    if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
      return `Field must be no more than ${rules.maxLength} characters long`;
    }

    if (rules.min && typeof value === 'number' && value < rules.min) {
      return `Field must be at least ${rules.min}`;
    }

    if (rules.max && typeof value === 'number' && value > rules.max) {
      return `Field must be no more than ${rules.max}`;
    }

    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      return 'Field format is invalid';
    }
  }

  return null;
};

export default function validate(schema: ValidationSchema): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: { [key: string]: string } = {};

    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body[field];
      const error = validateField(value, rules);
      if (error) errors[field] = error;
    }

    if (Object.keys(errors).length > 0) {
      const validationError = new Error('Validation failed');
      validationError.name = 'ValidationError';
      Object.assign(validationError, { details: errors });
      responseHelper(res, 400, 'Validation failed', null, validationError);
      return;
    }

    next();
  };
};
