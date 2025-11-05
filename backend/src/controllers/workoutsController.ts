import { Request, Response } from "express";
import { ApiResponse } from "../types/types";
import { workoutsService } from "../services/workoutsService";
import { Workout } from "@prisma/client";
import { RecordWithTtl } from "dns";

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
  // do i even need this if its already been cached from above if i get it to inc. exercises too in the req(or better to only inc. exercises when i need it on the detail page)
  getWorkoutDetails: async (
    req: Request,
    res: Response<ApiResponse<Workout>>,
  ) => {
    console.log("🔥 Received GET request to /workouts/:id");
    const { id } = req.params;
    try {
      const workoutDetails = await workoutsService.getWorkoutDetails(id);
      res.json({
        status: 200,
        message: "Workouts fetched successfully",
        data: workoutDetails,
      });
    } catch (err) {
      console.error("❌ Error fetching workout details:", err);
      res
        .status(500)
        .json({ status: 500, message: "Failed to fetch workout details" });
    }
  },
  addWorkoutLog: async (req: Request, res: Response) => {
    console.log("🔥 Received POST request to /workouts/:id");
    const { id } = req.params;
    const userId = req.user.id;
    const data = req.body;

    try {
      const workoutLog = await workoutsService.addWorkoutLog(id, userId, data);
      res.json({
        status: 200,
        message: "Workout logged successfully",
        data: workoutLog,
      });
    } catch (err) {
      console.error("❌ Error adding exercise log:", err);
      res.status(500).json({ status: 500, message: "Failed to log workout" });
    }
  },
};
