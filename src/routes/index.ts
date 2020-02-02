import { Request, Response } from "express";
import { apiRouter } from "./api.routes";
import { DBConnectionStatusEnum } from "../utils/consts";
import mongoose from 'mongoose';

export class Routes {
  public routes(app): void {
    app
      .use("/api", apiRouter)

      .get("/info", (req: Request, res: Response) => {
        // Define our information response json
        const responseJson = {
          project_name: `${process.env.COMPOSE_PROJECT_NAME}`,
          NODE_ENV: `${process.env.NODE_ENV}`,
          db_connection_string: `connection string: ${process.env.MONGODB_URI}`,
          db_connection_status: DBConnectionStatusEnum[mongoose.connection.readyState]
        };
        res.status(200).json(responseJson);
      })
      .route("/").get((req: Request, res: Response) => {
        const pageContent: string = `<h1>King 👑</h1>`;
        res.status(200).send(pageContent);
    });
  }
}
