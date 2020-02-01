import { Request, Response } from "express";
import GenericFunctions from "./genericFunctions";
import { CounterModel as model } from "../models/counter.model";


export class CounterController {
  // ***************** CRUD *********************************
  public static create = async (req: Request, res: Response) => {
    const newItem = { ...req.body };
    return await GenericFunctions.create(model, newItem, req, res);
  };

  public static getById = async (req: Request, res: Response) => {
    return await GenericFunctions.getById(model, req, res);
  };

  public static updateById = async (req: Request, res: Response) => {
    let updatedData = { ...req.body };
    return await GenericFunctions.updateById(model, updatedData, req, res);
  };

  public static deleteById = async (req: Request, res: Response) => {
    return await GenericFunctions.deleteById(model, req, res);
  };
  
  // *********************************************************

  public static getNextSequenceValue = async (sequenceName: string) => {
    let seq: number = 0;
    const filter: any = {_id: sequenceName};
    const update: any = {$inc: { seq: 1} };
    const options: any = {new: true, upsert: true};
    try {
      const sequenceDocument = await model.findByIdAndUpdate(filter, update, options);
      seq = sequenceDocument.seq;
    } catch (ex) {
      console.error(ex)
    }
    return seq;
  }
}
