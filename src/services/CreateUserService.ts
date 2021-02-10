import { getRepository } from 'typeorm';
import User from '../models/User';

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
      throw new Error('E-mail ja cadastrado');
    }

    const user = userRepository.create({ name, email, password });

    const userSave = await userRepository.save(user);

    return userSave;
  }
}

export default CreateUserService;
