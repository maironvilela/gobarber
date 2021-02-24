import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRouter = Router();
appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appoitments = await appointmentRepository.find();
  return response.json(appoitments);
});

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const createAppointmentService = new CreateAppointmentService();
  const parseDate = parseISO(date);

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parseDate,
  });
  return response.json(appointment);
});

export default appointmentRouter;
