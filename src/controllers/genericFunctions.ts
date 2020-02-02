import { Request, Response } from "express";
// import codes from "builtin-status-codes";
import Utils from "../utils/utils";
import { Model, Document } from "mongoose";

export default class GenericFunctions {
  // ***************** CRUD *********************************
  public static create = async (
    model: Model<Document>,
    newItem: any,
    req: Request,
    res: Response
  ) => {
    return model.create(newItem, (err, doc) => {
      if (err) return Utils.handleError(err, res);
      // saved!
      return res.status(200).json({data: doc});
    });
  };

  public static getById = async (model: any, req: Request, res: Response) => {
    const { _id } = req.params;
    // const { _id } = req.query;
    // const { _id } = req.body;
    if (!_id) return Utils.handleError(`_id=${_id}`, res);
    return model.find({ _id }, (err, doc) => {
      if (err) return Utils.handleError(err, res);
      // saved!
      return res.status(200).json({data: doc});
    });
  };

  public static updateById = async (
    model: any,
    updatedData,
    req: Request,
    res: Response
  ) => {
    const { _id } = req.params;
    // const { _id } = req.body;
    if (!_id) return Utils.handleError(`_id=${_id}`, res);
    return model.findOneAndUpdate(
      { _id }, // Condition
      { $set: updatedData }, // updated data
      { new: true }, // Options
      (err, doc) => {
        if (err) return Utils.handleError(err, res);
        // updated!
        return res.status(200).json({data: doc});
      }
    );
  };
  
  public static deleteById = async (model: any, req: Request, res: Response) => {
    const { _id } = req.params;
    // const { _id } = req.body;
    if (!_id) return Utils.handleError(`_id=${_id}`, res);
    return model.deleteOne({ _id }, (err, deleteRes) => {
      // Check if exist first
      if (err) return Utils.handleError(err, res);
      // deleted at most one document
      const { n, ok } = deleteRes;
      return res.status(200).json({n, ok});
    });
  };

  public static getAll = async (model: any, req: Request, res: Response) => {
    return model.find({}, (err, docs) => {
      const docsMap = {};

      docs.forEach((doc) => {
        docsMap[doc._id] = doc;
      });
  
      res.status(200).json(docsMap);  
    });
  };

  public static deleteAll = async (model: any, req: Request, res: Response) => {
    return model.remove({}, (err, deleteRes) => {
      // Check if exist first
      if (err) return Utils.handleError(err, res);
      const { n, ok } = deleteRes;
      return res.status(200).json({n, ok});
    });
  };
  // *********************************************************
  // Not in use
  public static test = async (model: Model<Document>, req: Request, res: Response) => {
    const pageContent: string = `<h1>${model.modelName} ${model.name} test api 📑</h1>`;
    return /* not need await */ await res.status(200).send(pageContent);
  };
}
