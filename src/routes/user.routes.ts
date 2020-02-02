import { Router } from "express";
import { UserController as cont } from "../controllers/user.controller";

export const userRouter: Router = Router();

userRouter
  .get("/test", cont.test)
  
  .post("/create", cont.create)
  .get("/getById", cont.getById)
  .post("/updateById", cont.updateById)
  .post("/deleteById", cont.deleteById)
  
  .get('/getAll', cont.getAll)
  .post('/deleteAll', cont.deleteAll)

  .post("/", cont.create)
  .get("/:_id", cont.getById)
  .put("/:_id", cont.updateById)
  .delete("/:_id", cont.deleteById)
  
  
