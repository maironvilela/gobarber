import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controller/AppointmentsController';
import ProviderAppointmentsController from '../controller/ProviderAppointmentsController';


const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();;
const providerAppointmentsController = new ProviderAppointmentsController

appointmentRouter.use(ensureAuthenticated);


appointmentRouter.get('/', appointmentsController.get)
appointmentRouter.get('/me', providerAppointmentsController.index)


appointmentRouter.post('/', appointmentsController.create)


export default appointmentRouter;
