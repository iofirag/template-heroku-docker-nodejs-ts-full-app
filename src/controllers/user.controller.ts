import { Request, Response } from "express";
import { GenericCRUDController } from "./GenericCRUDController";
import { UserModel as model } from "../models/user.model";
import Utils from "../utils/utils";


export class UserController extends GenericCRUDController {
  public static test = async (req: Request, res: Response) => {
    return res.status(200).json({'test': 99})
  }
}
