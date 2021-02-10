import { Router } from 'express';
import appointmentRouter from './appointment.router';
import userRouter from './user.router';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);

export default routes;
