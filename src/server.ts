import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import AppError from './errors/AppError';
import 'express-async-errors';

import routes from './routes';
import './database';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      statur: 'error',
      message: err.message,
    });
  } else {
    response.json({
      statur: 'error',
      message: 'Internal Server Error ',
    });
  }
});

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});
