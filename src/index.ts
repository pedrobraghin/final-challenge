import 'dotenv/config';
import { app } from './app';
import Server from './server';

const port = process.env.PORT || 3000;
const server = new Server(app, port);

server.start(() => {
  console.log(`Server is running on port: ${port}`);
});
