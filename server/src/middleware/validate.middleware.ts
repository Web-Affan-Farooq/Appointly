// src/middleware/validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError, z } from 'zod';

export const validate = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Parse and validate request against schema
            const validated = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            // Replace request data with validated and transformed data
            req.body = validated.body;
            req.query = validated.query as typeof req.query;
            req.params = validated.params as typeof req.params;

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));

                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: errors,
                });
            }

            next(error);
        }
    };
};

const LoginFormSchema = z.object().strict()
const validationMiddleware = validate(LoginFormSchema);