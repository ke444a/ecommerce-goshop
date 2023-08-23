export {};

declare global {
    namespace Express {
        export interface Request {
            uid?: string;
            role?: "USER" | "ADMIN";
            image?: string;
        }
    }
}