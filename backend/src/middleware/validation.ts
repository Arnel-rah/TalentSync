import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ErrorResponse } from '../schemas/zod';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Données invalides',
          error: 'Validation failed',
          details: error.errors.map(e => ({ path: e.path.join('.'), message: e.message })),
        } as ErrorResponse);
      }
      next(error);
    }
  };
};