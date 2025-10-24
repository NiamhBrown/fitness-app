import { Router, Request, Response } from "express";
import { workoutController } from "../controllers/workoutsController";

const router = Router();

router.get("/", workoutController.getAllWorkouts);
router.get("/:id", workoutController.getWorkoutDetails);

export default router;
