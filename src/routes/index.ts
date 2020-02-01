import { Request, Response } from "express";
import { apiRouter } from "./api.routes";

export class Routes {
  public routes(app): void {
    app
      .use("/api", apiRouter)

      .route("/").get((req: Request, res: Response) => {
        const pageContent: string = `<h1>King 👑</h1>`;
        res.status(200).send(pageContent);
    });
  }
}
