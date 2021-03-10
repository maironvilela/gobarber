import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";


interface IRequest {
  id: string,
  name?: string,
  email?: string,
  password?: string,
  old_password?: string
}

@injectable()
class UpdateProfileService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(
    {
      id,
      name,
      email,
      password,
      old_password }: IRequest): Promise<User> {


    let hashPassword;

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuario nao encontrado.')
    }

    if (email) {
      const userFindByEmail = await this.usersRepository.findByEmail(email);
      if (userFindByEmail && userFindByEmail.id !== id) {
        throw new AppError('Email ja cadastrado.')
      }
    }


    if (password) {

      if (!old_password) {
        throw new AppError('Senha antiga deve ser informada')
      }

      if (!await this.hashProvider.compareHash(old_password, user.password)) {
        throw new AppError('Senha invalida')
      }
      hashPassword = await this.hashProvider.generateHash(password);
    }





    Object.assign(user, {
      name,
      email,
      password: hashPassword

    })

    const userUpdate = await this.usersRepository.save(user);



    return userUpdate;

  }

}

export default UpdateProfileService
