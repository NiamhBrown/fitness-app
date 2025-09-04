import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

// add err handling and diconect to each one?
// why do these need to be async ?
router.get("/", async (req: Request, res: Response) => {
  console.log("🔥 Received GET request to /exercises");
  const exercises = await prisma.exercise.findMany();
  console.log("😃heres all the exercises:😃", exercises);
  res.json(exercises);
});

router.get("/:id/history", async (req: Request, res: Response) => {
  console.log("🔥 Received GET request to /exercises/:id/history");
  const { id } = req.params;
  console.log("id here:", id);
  const logs = await prisma.exerciseLog.findMany({ where: { exerciseId: id } });
  console.log("😃heres all the logs for THAT exercise:😃", logs);
  res.json(logs);
});

export default router;
