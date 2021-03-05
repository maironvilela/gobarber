import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserService from '@services/CreateUserService';
import UpdateUserAvatarService from '@services/UpdateUserAvatarService';
import User from '../../../../modules/users/infra/typeorm/entities/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

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

    const updateServerAvaterService = new UpdateUserAvatarService();
    const user = await updateServerAvaterService.execute({
      avatarFileName,
      user_id,
    });

    return response.json(user);
  },
);

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUserService = new CreateUserService();
  const user = await createUserService.execute({
    name,
    email,
    password,
  });

  return response.json(user);
});

export default userRouter;
