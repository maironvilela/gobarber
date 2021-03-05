import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment from '@entities/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appoitmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appoitmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appoitment is already booked');
    }

    // cria a instancia do model
    const appointment = appointmentRepository.create({
      provider_id,
      date: appoitmentDate,
    });

    // sava no banco de dados
    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
