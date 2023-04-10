import express from 'express';
import { appRouter } from './routes/app.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundRouteHandler } from './routes/notFoundRouteHandler';
import docs from './swagger/swagger.json';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());
app.use('/api/v1', appRouter);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
app.all('*', notFoundRouteHandler);
app.use(errorHandler);

export { app };
