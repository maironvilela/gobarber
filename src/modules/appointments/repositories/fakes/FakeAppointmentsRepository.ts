import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import { uuid } from "uuidv4";
import IAppointmentRepository from "../IAppointmentsRepository";

class FakeAppointmentRepository implements IAppointmentRepository {


  private appointments: Appointment[] = []

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id
    })

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      date.getTime() === appointment.date.getTime()
    )

    console.log(findAppointment)

    return findAppointment;

  }

}

export default FakeAppointmentRepository;
