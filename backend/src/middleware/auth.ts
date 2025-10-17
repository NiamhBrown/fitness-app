import { createClient } from "@supabase/supabase-js";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);
// import { Request, Response, NextFunction } from "express"
// should i add these types here req: Request, res: Response, next: NextFunction
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // extract token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    // verify token with supabase
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !authUser) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    // check local user table if already exists
    let appUser = await prisma.user.findUnique({ where: { id: authUser.id } });

    // when user signed up on FE first/last name from form got stored in metadata
    if (!appUser) {
      appUser = await prisma.user.create({
        data: {
          id: authUser.id, // same ID as auth table
          email: authUser.email,
          firstName: authUser.user_metadata.first_name,
          lastName: authUser.user_metadata.last_name,
          createdAt: new Date(),
        },
      });
    }
    // Attach user to request object
    req.user = appUser;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
};
