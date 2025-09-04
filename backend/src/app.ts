import cors from "cors";
import express from "express";
import exercisesRouter from "./routes/exercisesRoutes.js";

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

app.use("/exercises", exercisesRouter);

export default app;
