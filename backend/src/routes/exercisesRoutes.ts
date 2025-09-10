import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { exerciseController } from "../controllers/exercisesController";
import { personalBestController } from "../controllers/personalBestController";
import { authenticateToken } from "../middleware/auth";

const prisma = new PrismaClient();

const router = Router();

// get auth set up on one route first
router.get("/", authenticateToken, exerciseController.getAllExercises);
router.get("/:id/history", exerciseController.getExerciseLogs);
router.post("/:id/history", exerciseController.addExerciseLog);
router.put("/history", exerciseController.updateExerciseLog);
router.get("/:id/personalbest", personalBestController.getExercisePb);
router.get("/personalbests", personalBestController.getAllPbs);

export default router;
