import cors from "cors";
import express from "express";
import exercisesRouter from "./routes/exercisesRoutes.js";
import { authenticateToken } from "./middleware/auth.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} ${req.url}`);
  next();
});
app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript!");
});

app.use("/exercises", authenticateToken, exercisesRouter);

export default app;
