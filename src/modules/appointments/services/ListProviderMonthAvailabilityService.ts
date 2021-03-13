import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { getDate, getDaysInMonth } from "date-fns";
import { inject, injectable } from "tsyringe";
import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>


@injectable()
class ListProviderMonthAvailabilityService {

  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ) { }


  public async execute({
    provider_id, month, year
  }: IRequest): Promise<IResponse> {



    const appointments = await this.appointmentRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    //Quantidade de dias no mes
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))

    //cria um array com todos os dias do mes
    const eachDayArray = Array.from({
      length: numberOfDaysInMonth,
    }, (value, index) => index + 1)

    /*Realiza um map no array com os dias do mes armazenando o dia do mes e se há
    menos de 10 agendamentos {day: 1, available: true}*/
    const availability = eachDayArray.map(
      day => {
        const appointmentsInDay = appointments.filter(
          appointment => {
            return getDate(appointment.date) === day
          })

        return {
          day,
          available: appointmentsInDay.length < 10
        }
      })

    console.log(availability)




    return availability;
  }
}

export default ListProviderMonthAvailabilityService
