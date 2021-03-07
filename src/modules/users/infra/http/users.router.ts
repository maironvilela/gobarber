import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserService from '@services/CreateUserService';
import UpdateUserAvatarService from '@services/UpdateUserAvatarService';
import User from '../typeorm/entities/User';
import ensureAuthenticated from '../../../../shared/infra/http/middlewares/ensureAuthenticated';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { container } from 'tsyringe';

interface UserResponse {
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);

  const users = await userRepository.find();
  return response.json(users);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const avatarFileName = request.file.filename;
    const user_id = request.user.id;

    const userRepository = new UserRepository();
    const updateServerAvaterService = container.resolve(UpdateUserAvatarService);
    const user = await updateServerAvaterService.execute({
      avatarFileName,
      user_id,
    });

    return response.json(user);
  },
);

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = container.resolve(CreateUserService);
  const user = await createUserService.execute({
    name,
    email,
    password,
  });

  return response.json(user);
});

export default userRouter;
