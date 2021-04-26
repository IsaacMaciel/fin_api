import express from "express";
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors'
import "../../container/index";
import { router } from "../routes";

import createConnection from "../../../shared/infra/typeorm";
import { AppError } from "@errors/AppError";

createConnection();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          message: err.message
        });
      }

      return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message} `,
      });
})

export { app };
