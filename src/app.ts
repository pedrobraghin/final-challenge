import express from 'express';
import { appRouter } from './routes/app.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundRouteHandler } from './routes/notFoundRouteHandler';
const app = express();

app.use(express.json());
app.use('/api/v1', appRouter);
app.all('*', notFoundRouteHandler);
app.use(errorHandler);

export { app };
