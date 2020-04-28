import app from "./app";

const notifyMessage: String = `
  NOTE: 
  - if you are using Docker-Toolbox you can see your ip address in Docker-Terminal by running: "$(docker-machine ip)"
  (Docker toolbox doesn't map ports to localhost. It maps it to the Docker VM IP's)
  
  - if you are using Docker-For-Windows your ip will be just normal as localhost / 127.0.0.1`

class Server {
  constructor() {
    this.configureServer();
    this.createServer();
  }

  private configureServer(): void {
    // Configure server host + port
    app.set("host", process.env.HOST || '<your-ip>');
    app.set("port", process.env.PORT || 3000);
  }

  private createServer(): void {
    app.listen(app.get("port"), () => {
      // Note: 
      
      console.log(
        `🌎 Typescript app listening on
        ${app.get("host")}:${app.get("port")}
        Open up https://${app.get("host")}:${app.get("port")}/ in your browser.
        ${notifyMessage}`
      );
    });
  }
}

new Server();
