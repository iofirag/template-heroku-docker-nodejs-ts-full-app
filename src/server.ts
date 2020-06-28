// import server from "./app";

const notifyMessage: String = `
  NOTE: 
  - if you are using Docker-Toolbox you can see your ip address in Docker-Quickstart-Terminal by running: "$(docker-machine ip)"
  (Docker toolbox doesn't map ports to localhost. It maps it to the Docker VM IP's)
  
  - if you are using Docker-For-Windows your ip will be just normal as localhost / 127.0.0.1`


  import { json, urlencoded } from "body-parser";
  import cors from "cors";
  import express, { Application } from "express";
  import { Routes } from "./routes/index";
  import { DBDriver } from "./config/db.config";
  import http from 'http'
  import socketio from 'socket.io';
  
class Server {  

  public app: Application = express();
  public dbDriver: DBDriver = new DBDriver();
  public routePrv: Routes = new Routes();
  public httpServer: http.Server;
  public io: SocketIO.Server;

  constructor() {
    this.httpServer = new http.Server(this.app);
    this.io = socketio(this.httpServer)
    this.applyConfigs();
    this.applyMiddlewares();
    this.mountRestApi();
    this.mountSocketIO();
    this.configureServer();
    this.createServer();
  }

  private async applyConfigs() {
    await this.dbDriver.connect();
  }

  private applyMiddlewares(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
  }

  private mountRestApi(): void {
    this.routePrv.routes(this.app, this.io);
    // this.app.use("/", mainRouter);
  }

  private mountSocketIO(): void {
    // this.io.on("connection", function (socket) {
    //   // here are connections from /new
    //   console.log('user connected');
    //   socket.on('disconnect', (reason) => {
    //     console.log(`${reason}`);
    //   });
    // })
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
  }
}

new Server();