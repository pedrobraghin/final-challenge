import { Application } from 'express';
import { Server as HTTPServer } from 'http';

class Server {
  private server: HTTPServer | null;
  private port: number | string;
  private app: Application;

  constructor(app: Application, port: number | string) {
    this.port = port;
    this.app = app;
    this.server = null;
  }

  start(cb?: () => void): void {
    this.server = this.app.listen(this.port, cb);
  }

  stop(cb?: () => void): void {
    if (this.server) {
      this.server.close(cb);
    }
  }
}

export default Server;
