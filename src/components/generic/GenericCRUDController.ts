import { Request, Response } from "express";
// import codes from "builtin-status-codes";
import Utils from "../../utils/utils";
import { Model, Document } from "mongoose";
import { GenericCRUDFunctions } from "./GenericCRUDFunctions";


// interface IGenericCRUD {
//   create();
//   getById();
//   updateById();
//   deleteById();
//   getAll();
//   deleteAll();
//   // getByField();
// //   deleteByField();
// }

// interface IGenericCRUDController extends IGenericCRUD {}
export class GenericCRUDController /* implements IGenericCRUDController */ {

  public static create = async (req: Request, res: Response, model: Model<Document>) => {
    const newItem = { ...req.body };
    try {
      let doc = await GenericCRUDFunctions.create(model, newItem);
      return res.status(200).json(doc);
    } catch(err) {
      return Utils.handleError(err, res);
    }
  }

  public static getById = async (req: Request, res: Response, model: Model<Document>) => {
    const { _id } = req.params;
    try {
      let doc = await GenericCRUDFunctions.getById(model, _id);
      return res.status(200).json(doc);
    } catch(err) {
      return Utils.handleError(err, res);
    }
  }

  public static updateById = async (req: Request, res: Response, model: Model<Document>) => {
    const { _id } = req.params;
    const updatedData = { ...req.body };
    try {
      const doc = await GenericCRUDFunctions.updateById(model, _id, updatedData, {new: true});
      return res.status(200).json(doc);
    } catch(err) {
      return Utils.handleError(err, res);
    }
  }
  
  public static deleteById = async (req: Request, res: Response, model: Model<Document>) => {
    const { _id } = req.params;
    try {
      const deleteRes: any = await GenericCRUDFunctions.deleteById(model, _id);
      const { n, ok } = deleteRes;
      return res.status(200).json({n, ok});
    } catch(err) {
      return Utils.handleError(err, res);
    }
  }

  public static getAll = async (req: Request, res: Response, model: Model<Document>) => {
    const { field, value } = req.query;
    try {
      const docList: Document[] = await GenericCRUDFunctions.getAll(model, <string>field, <string>value);
      return res.status(200).json(docList);
    } catch (err) {
      return Utils.handleError(err, res);
    }
  }

  public static deleteAll = async (req: Request, res: Response, model: Model<Document>) => {
    try {
      const deleteRes = await GenericCRUDFunctions.deleteAll(model);
      const { n, ok } = deleteRes;
      return res.status(200).json({n, ok});
    } catch (err) {
      return Utils.handleError(err, res);
    }
  }

  public static describe = async (req: Request, res: Response, model: Model<Document>) => {
    const pageContent: string = `<h1>${model.modelName} ${model.name} describe api 📑</h1>`;
    return /* not need await */ res.status(200).send(pageContent);
  }
}


// const { _id } = req.params;
// const { _id } = req.query;
// const { _id } = req.body;