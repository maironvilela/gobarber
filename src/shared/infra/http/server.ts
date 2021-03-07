import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';
import '@shared/infra/typeorm';
import '../../container/index'


import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';

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
      message: err,
    });
  }
});

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});
