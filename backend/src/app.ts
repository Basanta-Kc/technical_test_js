import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import cors from "cors";
import bodyParser from "body-parser";
import recommendationsRouter from "./routes/recommendations";
import usersRouter from "./routes/users";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./errors/error-middleware";

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/recommendations", recommendationsRouter);
app.use("/users", usersRouter);

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
