import "reflect-metadata"
import CreateUserService from '../services/CreateUserService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from "@shared/errors/AppError";


describe("Create User Users", () => {
  it('should be able to create user', async () => {

    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const createUsersService = new CreateUserService(fakeUsersRepository, fakeHashProvider);


    const user = await createUsersService.execute({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })
    expect(user).toHaveProperty('id')

  })

  it('should not be able to create user whit existent e-mail', async () => {

    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const createUsersService = new CreateUserService(fakeUsersRepository, fakeHashProvider);


    const user = await createUsersService.execute({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })
    expect(createUsersService.execute({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);

  })
})
