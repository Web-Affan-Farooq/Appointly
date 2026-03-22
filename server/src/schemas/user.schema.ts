// src/schemas/user.schema.ts
import { z } from 'zod';

// Base user schema
export const userSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    name: z.string().min(2).max(100),
    role: z.enum(['admin', 'user']).default('user'),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Schema for creating a user (no id, dates auto-generated)
export const createUserSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email format'),
        name: z.string().min(2, 'Name must be at least 2 characters'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain an uppercase letter')
            .regex(/[0-9]/, 'Password must contain a number'),
        role: z.enum(['admin', 'user']).optional(),
    }),
});

// Schema for updating a user
export const updateUserSchema = z.object({
    body: z.object({
        email: z.string().email().optional(),
        name: z.string().min(2).max(100).optional(),
        role: z.enum(['admin', 'user']).optional(),
    }),
    params: z.object({
        id: z.string().uuid('Invalid user ID'),
    }),
});

// Schema for getting a user by ID
export const getUserSchema = z.object({
    params: z.object({
        id: z.string().uuid('Invalid user ID'),
    }),
});

// Schema for listing users with pagination
export const listUsersSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().positive().default(1),
        limit: z.coerce.number().int().positive().max(100).default(10),
        role: z.enum(['admin', 'user']).optional(),
        search: z.string().optional(),
    }),
});

// Infer types from schemas
export type User = z.infer<typeof userSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];
export type ListUsersQuery = z.infer<typeof listUsersSchema>['query'];