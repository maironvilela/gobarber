import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError(
        'Somente usuarios autenticados podem alterar o avatar',
        401,
      );
    }
    if (user.avatar) {
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
    const userUpdate = userRepository.save(user);

    return userUpdate;
  }
}

export default UpdateUserAvatarService;
