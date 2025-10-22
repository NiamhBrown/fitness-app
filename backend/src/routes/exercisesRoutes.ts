import { Router } from "express";
import { exerciseController } from "../controllers/exercisesController";
import { personalBestController } from "../controllers/personalBestController";

const router = Router();

router.get("/", exerciseController.getAllExercises);
router.get("/:id", exerciseController.getExercise);
router.get("/:id/history", exerciseController.getExerciseLogs);
router.post("/:id/history", exerciseController.addExerciseLog);
router.put("/history", exerciseController.updateExerciseLog);
router.get("/:id/personalbest", personalBestController.getExercisePb);
router.get("/personalbests", personalBestController.getAllPbs);

export default router;
