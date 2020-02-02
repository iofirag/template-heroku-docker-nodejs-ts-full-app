import { Router } from "express";
import { UserController as cont } from "../controllers/user.controller";

export const userRouter: Router = Router();

userRouter
  // put here new api's
  .get("/test", cont.test)

  // Bulk actions
  .get('/getAll', cont.getAll)
  .delete('/deleteAll', cont.deleteAll)
  
  // Leave at the end
  .post("/", cont.create)
  .get("/:_id", cont.getById)
  .put("/:_id", cont.updateById)
  .delete("/:_id", cont.deleteById)

  
  
