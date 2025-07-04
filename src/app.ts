import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://hypestat-scrapper-frontend.vercel.app',
    ],
    credentials: true,
  }),
);

//welcome route
app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Welcome to EGL Server',
    data: null,
  });
});

// application routes
app.use('/api/v1', router);

//global error handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
