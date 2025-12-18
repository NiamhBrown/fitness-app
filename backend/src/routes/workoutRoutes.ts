import { Router, Request, Response } from "express";
import { workoutController } from "../controllers/workoutsController";

const router = Router();

router.get("/", workoutController.getAllWorkouts);
router.get("/history", workoutController.getWorkoutHistory);
router.get("/history/:id", workoutController.getWorkoutLogById);
router.get("/:id", workoutController.getWorkoutDetails);
router.post("/:id/", workoutController.addWorkoutLog);

export default router;
