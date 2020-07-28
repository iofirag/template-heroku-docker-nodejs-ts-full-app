import { Router } from "express";
import { UserController as cont } from "../controllers/user.controller";
import { UserModel } from "../models/user.model";


export class UserRouter {
  public router: Router = Router()

  constructor() {
    this.createCustomApi()
    this.createCRUDApi()
  }

  private createCRUDApi() {
    // Describe collection
    this.router
    .get('/describe', (req, res) => { return cont.describe(req, res, UserModel)})

    // Bulk actions
    .get('/getAll', (req, res) => { return cont.getAll(req, res, UserModel)})
    .get('/getAllByfieldValue', (req, res) => { return cont.getAll(req, res, UserModel)})
    .delete('/deleteAll', (req, res) => { return cont.deleteAll(req, res, UserModel)})

    // Leave at the end
    .post('/', (req, res) => { return cont.create(req, res, UserModel)})
    .get('/:_id', (req, res) => { return cont.getById(req, res, UserModel)})
    .put('/:_id', (req, res) => { return cont.updateById(req, res, UserModel)})
    .delete('/:_id', (req, res) => { return cont.deleteById(req, res, UserModel)})
  }

  private createCustomApi() {
    // put here new rest api's
    this.router
    .get('/test', cont.test)
  }
}