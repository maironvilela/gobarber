import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import UseresTokenRepository from '@modules/users/infra/typeorm/repositories/UseresTokenRepository';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';



container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)


container.registerSingleton<IUsersTokenRepository>(
  'UseresTokenRepository',
  UseresTokenRepository
)




