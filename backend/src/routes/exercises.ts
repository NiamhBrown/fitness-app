import { Router, Request, Response } from "express";

const router = Router();

// Dummy data (for now)
const exercises = [
  { id: "bench", name: "Bench Press" },
  { id: "squat", name: "Squat" },
  { id: "deadlift", name: "Deadlift" },
];
const exerciseLogs = [
  {
    id: "s1",
    exerciseId: "bench",
    date: "2025-08-25",
    setNumber: 1,
    reps: 8,
    weight: 60,
  },
  {
    id: "s2",
    exerciseId: "bench",
    date: "2025-08-25",
    setNumber: 2,
    reps: 6,
    weight: 65,
  },
  {
    id: "s3",
    exerciseId: "bench",
    date: "2025-08-27",
    setNumber: 1,
    reps: 10,
    weight: 55,
  },
  {
    id: "s4",
    exerciseId: "squat",
    date: "2025-08-26",
    setNumber: 1,
    reps: 5,
    weight: 80,
  },
];

router.get("/", (req: Request, res: Response) => {
  console.log("🔥 Received GET request to /exercises");
  res.json(exercises);
});

router.get("/:id/history", (req: Request, res: Response) => {
  console.log("🔥 Received GET request to /exercises/:id/history");
  const { id } = req.params;
  const logs = exerciseLogs.filter((log) => log.exerciseId === id);
  res.json(logs);
});

export default router;
