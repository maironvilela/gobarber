import { hash } from 'bcryptjs';

import User from '@entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository) { }


  public async execute({ name, email, password }: Request): Promise<User> {
    const CheckEmailExists = await this.userRepository.findByEmail(email);

    if (CheckEmailExists) {
      throw new AppError('E-mail ja cadastrado', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
