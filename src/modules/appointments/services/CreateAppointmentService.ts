import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment from '@entities/Appointment';
import AppointmentRepository from '../infra/typeorm/repositories/AppointmentRepository';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IRequest {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
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

    return appointment;
  }
}

export default CreateAppointmentService;
