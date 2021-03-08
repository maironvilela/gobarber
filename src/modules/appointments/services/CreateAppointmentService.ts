import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ) { }

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {

    const appoitmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appoitmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appoitment is already booked');
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
