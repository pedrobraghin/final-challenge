import 'dotenv/config';
import Server from './server';
import { app } from './app';
import { connect } from './database/db';

const port = process.env.PORT || 3000;
const server = new Server(app, port);

server.start(async () => {
  await connect();
  console.log('Database connection established');
  console.log(`Server is running on port: ${port}`);
});
