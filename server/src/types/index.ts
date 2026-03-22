// src/types/index.ts
import { Request, Response, NextFunction } from 'express';

// Generic typed request with body, query, and params
export interface TypedRequest<
    TBody = unknown,
    TQuery = unknown,
    TParams = unknown
> extends Request {
    body: TBody;
    query: TQuery;
    params: TParams;
}

// Async handler wrapper to catch errors
export type AsyncHandler<
    TBody = unknown,
    TQuery = unknown,
    TParams = unknown
> = (
    req: TypedRequest<TBody, TQuery, TParams>,
    res: Response,
    next: NextFunction
) => Promise<void>;

// API response types
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}