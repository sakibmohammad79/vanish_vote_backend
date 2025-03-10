import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleWares/globalErrorHandler";
import notFoundHandler from "./app/middleWares/notFoundHandler";
const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Vanish Vote Backend!");
});

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
