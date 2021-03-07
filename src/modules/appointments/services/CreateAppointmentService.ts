import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@entities/Appointment';
import AppointmentRepository from '../infra/typeorm/repositories/AppointmentRepository';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IRequest {
  provider_id: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: AppointmentRepository
  ) { }

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {

    const appoitmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appoitmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appoitment is already booked');
    }

    // cria a instancia do model
    const appointment = this.appointmentRepository.create({
      provider_id,
      date: appoitmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
