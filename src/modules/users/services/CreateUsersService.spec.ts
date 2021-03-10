import "reflect-metadata"
import CreateUserService from '../services/CreateUserService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from "@shared/errors/AppError";

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUsersService: CreateUserService

beforeEach(() => {
  fakeHashProvider = new FakeHashProvider();
  fakeUsersRepository = new FakeUsersRepository();
  createUsersService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

})

describe("Create User Users", () => {
  it('should be able to create user', async () => {

    const user = await createUsersService.execute({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })
    expect(user).toHaveProperty('id')

  })

  it('should not be able to create user whit existent e-mail', async () => {

    const user = await createUsersService.execute({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })
    await expect(createUsersService.execute({
      name: "maria",
      email: "maria@email.com",
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);

  })
})
