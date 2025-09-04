import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { exerciseController } from "../controllers/exercisesController";

const prisma = new PrismaClient();

const router = Router();

router.get("/", exerciseController.getAllExercises);

router.get("/:id/history", exerciseController.getExerciseLogs);

export default router;
