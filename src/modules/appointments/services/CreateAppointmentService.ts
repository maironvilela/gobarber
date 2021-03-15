import { startOfHour, isAfter, isBefore, getDate, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { format } from 'date-fns';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) { }

  public async execute({ provider_id, user_id, date }: IRequest): Promise<Appointment> {

    if (provider_id === user_id) {
      throw new AppError('Falha ao realizar agendamento. Favor, escolher outro prestador')
    }

    if (isBefore(date, Date.now())) {
      throw new AppError('Não pode ser realizado um agendamento com a data informada. Favor informar uma data valida')
    }


    if (getHours(date) < 8 || getHours(date) > 17) {
      throw new AppError('Não pode ser realizado um agendamento no horario informada. Favor informar um horario de 08:00 as 17:00')
    }

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
      user_id,
      date: appoitmentDate,
    });

    const dateFormatted = format(appoitmentDate, "dd/MM/yyy 'às' HH:mm")

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`
    })

    return appointment;
  }
}

export default CreateAppointmentService;
