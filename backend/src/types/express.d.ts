import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        // add more fields from Supabase user if you need, will this user be from my user table, or the auth user table?
      };
    }
  }
}
