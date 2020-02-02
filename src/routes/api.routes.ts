import { Request, Response, Router } from "express";
import { userRouter } from "./user.routes";

export const apiRouter: Router = Router();

apiRouter
  // Add here all your Entities collections
  .use("/user", userRouter)

  .get("/", (req: Request, res: Response) => {
    const pageContent: string = `<h1>Our King 👑 api</h1>`;
    res.status(200).send(pageContent);
  });
