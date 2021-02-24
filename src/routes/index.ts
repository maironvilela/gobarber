import express, { Router } from 'express';

import appointmentRouter from './appointments.router';
import userRouter from './users.router';
import sessionRouter from './sessions.router';

import uploadConfig from '../config/upload';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/files', express.static(uploadConfig.tmpDirectory));
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
