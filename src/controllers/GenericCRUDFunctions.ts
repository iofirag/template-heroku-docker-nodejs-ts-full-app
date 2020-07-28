import { Request, Response } from "express";
// import codes from "builtin-status-codes";
import Utils from "../utils/utils";
import { Model, Document, QueryFindOneAndUpdateOptions } from "mongoose";


// interface IGenericCRUDFunctions extends IGenericCRUD {}
export class GenericCRUDFunctions /* implements IGenericCRUDFunctions */ {
  public static create = async (model: Model<Document>, newItem: any) => {
    return model.create(newItem);
  }

  public static getById = async(model: Model<Document>, _id: string) => {
    return model.findById(_id);
  }

  public static updateById = async (model: Model<Document>, _id: string, updatedData: any, op: QueryFindOneAndUpdateOptions={}) => {
    return model.findByIdAndUpdate(_id, { $set: updatedData }, op)
  }

  public static deleteById = async (model: Model<Document>, _id: string) => {
    return model.findByIdAndDelete(_id);
  }

  public static getAll = async (model: Model<Document>, field: string = '', value: string = '') => {
    if (field && value) {
      return model.find({[field]: value});
    } else {
      return model.find({});
    }
  }

  public static deleteAll = async (model: Model<Document>) => {
    return model.remove({})
  }
}
