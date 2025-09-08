import { Request, Response } from "express";
import { personalBestService } from "../services/personalBestService";

export const personalBestController = {
  getExercisePb: async (req: Request, res: Response) => {
    console.log("🔥 Received GET request to /exercises/:id/personalbest");
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ status: 400, message: "Valid exerciseId is required" });
    }
    try {
      //hardcoded user id (1)
      const personalBest = await personalBestService.getExercisePb(id, "1");
      res.json({
        status: 200,
        message: "personalBest fetched successfully",
        data: personalBest,
      });
    } catch (err) {
      console.error("❌ Error fetching personalBest:", err);
      res
        .status(500)
        .json({ status: 500, message: "Failed to fetch personalBest" });
    }
  },
  getAllPbs: async (req: Request, res: Response) => {
    console.log("🔥 Received GET request to /exercises/personalbests");

    try {
      //hardcoded user id (1)
      const personalBests = await personalBestService.getAllPbs("1");
      res.json({
        status: 200,
        message: "personalBest fetched successfully",
        data: personalBests,
      });
    } catch (err) {
      console.error("❌ Error fetching personalBests:", err);
      res
        .status(500)
        .json({ status: 500, message: "Failed to fetch personalBests" });
    }
  },
};
