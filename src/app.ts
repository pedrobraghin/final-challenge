import express from 'express';
import { appRouter } from './routes/app.routes';

const app = express();

app.use(express.json());

app.use('/api/v1', appRouter);

export { app };
