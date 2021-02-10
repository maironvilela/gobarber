import { Router } from 'express';

import appointmentRouter from './appointments.router';
import userRouter from './users.router';
import sessionRouter from './sessions.router';


const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
