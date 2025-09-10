import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

// this here for now, think i shuld be creating one client for whole BE?? in the app. ts file?

const prisma = new PrismaClient();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY // Important: Service role, not anon key, RESEARCH THIS
);
// import { Request, Response, NextFunction } from "express"
// should i add these types here req: Request, res: Response, next: NextFunction
export const authenticateToken = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    // Verify token with Supabase Auth server
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
};
