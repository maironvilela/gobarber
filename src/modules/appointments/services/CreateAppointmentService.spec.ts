import "reflect-metadata"
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from "@shared/errors/AppError";

describe("Create Appointment", () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: "123"
    })

    expect(appointment).toHaveProperty('id')

  })


  it('should be able to return an error in case of two appointments with the same date', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

    const dateAppointment = new Date(2021, 2, 12, 11);

    await createAppointment.execute({
      date: dateAppointment,
      provider_id: "123"
    });

    expect(createAppointment.execute({
      date: dateAppointment,
      provider_id: "1234"
    }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
