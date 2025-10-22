import { Request, Response } from "express";
import { ApiResponse } from "../types/types";
import { workoutsService } from "../services/workoutsService";
import { Workout } from "@prisma/client";

export const workoutController = {
  getAllWorkouts: async (
    req: Request,
    res: Response<ApiResponse<Workout[]>>,
  ) => {
    console.log("🔥 Received GET request to /workouts");

    try {
      const workouts = await workoutsService.getAllWorkouts();
      res.json({
        status: 200,
        message: "Workouts fetched successfully",
        data: workouts,
      });
    } catch (err) {
      console.error("❌ Error fetching workouts:", err);
      res
        .status(500)
        .json({ status: 500, message: "Failed to fetch workouts" });
    }
  },
};
