import { Router } from "express";
import { SynagogueController as cont } from "../controllers/synagogue.controller";

export const synagogueRouter: Router = Router();

synagogueRouter
  .post("/", cont.create)
  .get("/:_id", cont.getById)
  .put("/:_id", cont.updateById)
  .delete("/:_id", cont.deleteById)
  // .get("/test", cont.test);
// .post("/create", cont.create)
// .post("/getById", cont.getById)
// .post("/updateById", cont.updateById)
// .post("/deleteById", cont.deleteById)
// .get("/test", cont.test);
