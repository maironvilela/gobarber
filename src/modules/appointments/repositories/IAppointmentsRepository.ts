import Appointment from '@entities/Appointment';
import ICreateAppontmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppontmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
