import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controller/AppointmentsController';


const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();;

appointmentRouter.use(ensureAuthenticated);


appointmentRouter.get('/', appointmentsController.get)

appointmentRouter.post('/', appointmentsController.create)


export default appointmentRouter;
