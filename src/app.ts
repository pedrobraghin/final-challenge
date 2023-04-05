import express from 'express';
import { appRouter } from './routes/app.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/api/v1', appRouter);
app.use(errorHandler);

export { app };
