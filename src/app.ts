import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import { Application } from "express";
import { Routes } from "./routes/index";
import { DBDriver } from "./config/db.config";

class App {
  public app: Application;
  public dbDriver: DBDriver = new DBDriver();
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.applyConfigs();
    this.applyMiddlewares();
    this.mountRoutes();
  }

  private async applyConfigs() {
    await this.dbDriver.connect();
  }
  private applyMiddlewares(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
  }
  private mountRoutes(): void {
    this.routePrv.routes(this.app);
    // this.app.use("/", mainRouter);
  }
}
export default new App().app;
