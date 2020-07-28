import { Request, Response, Router } from "express";
import { UserRouter } from "./user.routes";


export class ApiRouter {
  public router: Router = Router();

  constructor() {
    this.router
    // Add here all your Entities collections
    .use("/user", new UserRouter().router)

    .get("/", (req: Request, res: Response) => {
      const pageContent: string = `<h1>Our King 👑 api</h1>`;
      res.status(200).send(pageContent);
    })
  }
}