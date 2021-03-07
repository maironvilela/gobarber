import express, { Router } from 'express';

import uploadConfig from '@config/upload';
import appointmentRouter from '../../../../modules/appointments/infra/http/routes/appointments.router';
import userRouter from '../../../../modules/users/infra/http/routes/users.router';
import sessionRouter from '../../../../modules/users/infra/http/routes/sessions.router';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/files', express.static(uploadConfig.tmpDirectory));
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
