import { Request, Response, Router } from "express";
// import { memberRouter } from "./member.routes";
// import { debtRouter } from "./debt.routes";
import { synagogueRouter } from "./synagogue.routes";
// import { userRouter } from "./user.routes";

export const apiRouter: Router = Router();

apiRouter
  // .use("/counter", memberRouter)
  // .use("/debt", memberRouter)
  // .use("/member", memberRouter)
  // .use("/payment", memberRouter)
  // .use("/role", obligationRouter)
  .use("/synagogue", synagogueRouter)
  // .use("/user", userRouter)

  .get("/", (req: Request, res: Response) => {
    const pageContent: string = `<h1>Our King 👑 api</h1>`;
    res.status(200).send(pageContent);
  });
