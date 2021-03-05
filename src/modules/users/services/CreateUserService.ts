import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@entities/User';
import AppError from '@shared/errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const CheckEmailExists = await userRepository.findOne({
      where: { email },
    });

    if (CheckEmailExists) {
      throw new AppError('E-mail ja cadastrado', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    user.avatar = 'avatar_padrao.png';

    const userSave = await userRepository.save(user);

    // delete userSave.password;

    return userSave;
  }
}

export default CreateUserService;
