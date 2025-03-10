import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/polls");

app.get("/", (req: Request, res: Response) => {
  res.send("Vanish Vote Backend!");
});

export default app;
