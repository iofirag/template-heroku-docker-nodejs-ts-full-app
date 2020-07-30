import { Request, Response } from "express";
import { ApiRouter } from "./api.routes";
import { DBConnectionStatusEnum } from "../utils/consts";
import mongoose from 'mongoose';
import { Application } from "express";

export class AppRouter {
  public app: Application
  public io: SocketIO.Server

  constructor(app: Application, io: SocketIO.Server) {
    this.app = app;
    this.io = io;
    this.apiRoutes();
    this.socketIo();
  }

  private apiRoutes(): void {
    this.app
    .use("/api", new ApiRouter().router)
    .get("/info", (req: Request, res: Response) => {
      // Define our information response json
      const responseJson = {
        project_name: `${process.env.COMPOSE_PROJECT_NAME}`,
        NODE_ENV: `${process.env.NODE_ENV}`,
        db_connection_string: `connection string: ${process.env.DBSERVICE_URI}`,
        db_connection_status: DBConnectionStatusEnum[mongoose.connection.readyState]
      };
      res.status(200).json(responseJson);
    })
    .get('/',(req: Request, res: Response) => {
      const pageContent: string = `<h1>King 👑</h1>`;
      res.status(200).send(pageContent);
    })
  }

  private socketIo(): void {
    this.app
    .get('/test-io', (req: Request, res: Response) => {
      const pageContent: string = `
      <!doctype html>
      <html>
        <head>
          <title>page</title>
        </head>
        <body>
          test page socket io
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.dev.js"></script>
        <script>
          var socket = io();
        </script>
        </body>
      </html>`;
      res.status(200).send(pageContent);
    })
    
    this.io
    .on("connection", (socket) => {
      console.log('user connected');
      socket.on('disconnect', (reason) => {
        console.log(`${reason}`);
      })
    })
  }
}
