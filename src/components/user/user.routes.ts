import { Router } from "express";
import { UserController as cont } from "./user.controller";
import { UserModel } from "./user.model";
import { GenericCRUDRouter } from "../generic/genericCRUDRouter";


export class UserRouter extends GenericCRUDRouter {

  constructor() {
    super(UserModel, UserRouter.createCustomApi)
  }
  
  static createCustomApi(router: Router) {
    // put here new rest api's
    router
    .get('/test', cont.test)
  }
}