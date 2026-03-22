import { Request } from 'express';

// Extend Express Request to include user after authentication
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: 'admin' | 'user';
            };
        }
    }
}

export { };