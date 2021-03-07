import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';


import CreateAppointmentService from '@services/CreateAppointmentService';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import AppointmentRepository from '../../typeorm/repositories/AppointmentRepository';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);


appointmentRouter.get('/', async (request, response) => {
  const appointmentRepository = new AppointmentRepository();
  const appoitments = await appointmentRepository.find();
  return response.json(appoitments);
});

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const createAppointmentService = container.resolve(CreateAppointmentService);
  const parseDate = parseISO(date);

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parseDate,
  });
  return response.json(appointment);
});

export default appointmentRouter;
