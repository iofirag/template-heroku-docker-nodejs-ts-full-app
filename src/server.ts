// import server from "./app";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import { DBDriver } from "./config/db.config";
import http from 'http';
import socketio from 'socket.io';
import { AppRouter } from "./routes";
import dotenv from 'dotenv';
import { GenericCRUDController } from "./components/generic/genericCRUDController";

const notifyMessage: String = `
  NOTE: 
  - if you are using Docker-Toolbox you can see your ip address in Docker-Quickstart-Terminal by running: "$(docker-machine ip)"
  (Docker toolbox doesn't map ports to localhost. It maps it to the Docker VM IP's)
  
  - if you are using Docker-For-Windows your ip will be just normal as localhost / 127.0.0.1`
  
class Server {  
  public app: Application = express();
  public dbDriver: DBDriver;
  public httpServer: http.Server;
  public io: SocketIO.Server;
  public appRouter: AppRouter;

  constructor() {
    console.log(dotenv.config())
    this.dbDriver = new DBDriver(process.env.DBSERVICE_URI);
    this.httpServer = new http.Server(this.app);
    this.applyMiddlewares();
    this.io = socketio(this.httpServer);
    this.appRouter = new AppRouter(this.app, this.io);
    // this.applyConfigs();
    this.configureServer();
    this.createServer();
  }

  private async applyConfigs() { }

  private applyMiddlewares(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(GenericCRUDController.printRequest)
  }

  private configureServer(): void {
    // Configure server host + port
    this.app.set("host", process.env.HOST || '<your-ip>');
    this.app.set("port", process.env.PORT || 3000);
  }

  private createServer(): void {
    const server = this.httpServer.listen(this.app.get("port"), () => {
      console.log(
        `🌎 Typescript server.app listening on
        ${this.app.get("host")}:${this.app.get("port")}
        Open up https://${this.app.get("host")}:${this.app.get("port")}/ in your browser.
        ${notifyMessage}`
      );
    });
    process.on('SIGQUIT', () => {
      console.log('app SIGQUIT');
      process.exit(0);
    });
    process.on('SIGINT', () => {
      console.log('app sigint');
      process.exit(0);
    });
    process.on('exit', () => {
      console.log('app exit');
      process.exit(0);
    });
  }
}

new Server();