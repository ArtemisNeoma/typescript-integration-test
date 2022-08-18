import { errorMiddleware } from '@middleware/errorMiddleware';
import express, { json } from 'express';
import helmet from 'helmet';
import mainRouter from './presentation/routes';

const app = express();
app.use(helmet());
app.use(json());
app.use(mainRouter);
app.use(errorMiddleware);

export default app;
