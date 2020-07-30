import { Router } from "express";
import { Model, Document } from "mongoose";
import { GenericCRUDController } from "./genericCRUDController";


export class GenericCRUDRouter {
  public router: Router = Router()

  constructor(model: Model<Document>, customApi: Function) {
    // User custom api
    customApi(this.router);

    this.router
    .get('/describe', (req, res) => GenericCRUDController.describe(req, res, model))
    
    // Bulk actions
    .get('/getAll', (req, res) => GenericCRUDController.getAll(req, res, model))
    .get('/getAllByfieldValue', (req, res) => GenericCRUDController.getAll(req, res, model))
    .delete('/deleteAll', (req, res) => GenericCRUDController.deleteAll(req, res, model))
    
    // Leave at the end
    .post('/', (req, res) => GenericCRUDController.create(req, res, model))
    .get('/:_id', (req, res) => GenericCRUDController.getById(req, res, model))
    .put('/:_id', (req, res) => GenericCRUDController.updateById(req, res, model))
    .delete('/:_id', (req, res) => GenericCRUDController.deleteById(req, res, model))
  }
}