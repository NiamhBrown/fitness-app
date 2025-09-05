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
      const exerciseLogs = await exercisesService.getExerciseLogs(id);
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
  addExerciseLog: async (
    req: Request<{ id: string }, {}, ExerciseLog[]>,
    res: Response
  ) => {
    console.log("🔥 Received POST request to /exercises/:id/history");
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ status: 400, message: "Valid exerciseId is required" });
    }

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "Request body must contain at least one log",
      });
    }

    try {
      const exerciseLogs = await exercisesService.addExerciseLog(id, data);
      res.json({
        status: 200,
        message: "Exercise logs added successfully",
        data: exerciseLogs,
      });
    } catch (err) {
      console.error("❌ Error adding exercise log:", err);
      res
        .status(500)
        .json({ status: 500, message: "Failed to add exercise log" });
    }
  },
};
