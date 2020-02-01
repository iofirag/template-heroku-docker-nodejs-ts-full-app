import app from "./app";

class Server {
  constructor() {
    this.configureServer();
    this.createServer();
  }

  private configureServer(): void {
    // Configure server host + port
    app.set("host", process.env.HOST || "localhost");
    app.set("port", process.env.PORT || 3000);
  }

  private createServer(): void {
    app.listen(app.get("port"), () => {
      console.log(
        `🌎 Typescript app listening on
        ${app.get("host")}:${app.get("port")}
          Open up https://${app.get("host")}:${app.get(
          "port"
        )}/ in your browser.`
      );
    });
  }
}

new Server();

