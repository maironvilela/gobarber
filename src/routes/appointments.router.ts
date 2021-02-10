import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

appointmentRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appoitments = await appointmentRepository.find();
  return response.json(appoitments);
});

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    const createAppointmentService = new CreateAppointmentService();
    const parseDate = parseISO(date);

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parseDate,
    });
    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default appointmentRouter;
