import { Request, Response } from "express";
import { exercisesService } from "../services/exercisesService";
import { ApiResponse } from "../types/types";
import { Exercise, ExerciseLog } from "@prisma/client";

export const exerciseController = {
  getAllExercises: async (
    req: Request,
    res: Response<ApiResponse<Exercise[]>>
  ) => {
    console.log("🔥 Received GET request to /exercises");
    try {
      const exercises = await exercisesService.getAllExercises();
      res.json({
        status: 200,
        message: "Exercises fetched successfully",
        data: exercises,
      });
    } catch (err) {
      console.error("❌ Error fetching exercises:", err);
      res
        .status(500)
        .json({ status: 500, message: "Failed to fetch exercises" });
    }
  },

  getExerciseLogs: async (
    req: Request,
    res: Response<ApiResponse<ExerciseLog[]>>
  ) => {
    console.log("🔥 Received GET request to /exercises/:id/history");
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ status: 400, message: "Valid exerciseId is required" });
    }
    try {
      const exerciseLogs = await exercisesService.getExerciseLog(id);
      res.json({
        status: 200,
        message: "Exercise logs fetched successfully",
        data: exerciseLogs,
      });
    } catch (err) {
      console.error("❌ Error fetching exercises:", err);
      res
        .status(500)
        .json({ status: 500, message: "Failed to fetch exercise logs" });
    }
  },
};
