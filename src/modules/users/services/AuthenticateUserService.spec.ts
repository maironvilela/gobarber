import "reflect-metadata"
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from '../services/CreateUserService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from "@shared/errors/AppError";


describe("Authenticate Users", () => {
  it('should be able to authenticate', async () => {

    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const createUsersService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);


    const user = await createUsersService.execute({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })

    const response = await authenticateUserService.execute({
      email: "maria@email.com",
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)

  })

  it('should not be able to authenticate with an invalid e-mail ', async () => {

    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const createUsersService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);


    const user = await createUsersService.execute({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })


    expect(authenticateUserService.execute({
      email: "maria@email.com.br",
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)


  })

  it('should not be able to authenticate with an invalid password ', async () => {

    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const createUsersService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);


    const user = await createUsersService.execute({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })


    expect(authenticateUserService.execute({
      email: "maria@email.com",
      password: 'aadasda'
    })).rejects.toBeInstanceOf(AppError)


  })
})
