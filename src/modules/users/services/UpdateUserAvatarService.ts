import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import User from '@entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository) { }

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        'Somente usuarios autenticados podem alterar o avatar',
        401,
      );
    }
    if (user.avatar) {
      console.log('entrou')
      // Define o caminho em que o arquivo foi salvo
      const userAvatarFilePath = path.join(
        uploadConfig.tmpDirectory,
        user.avatar,
      );

      // verifica se o arquivo existe
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        // deletando o arquivo
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    const userUpdate = this.userRepository.save(user);

    return userUpdate;
  }
}

export default UpdateUserAvatarService;
