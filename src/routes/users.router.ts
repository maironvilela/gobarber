import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';

import User from '../models/User';

interface UserResponse {
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

const userRouter = Router();

userRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  return response.json(users);
});

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default userRouter;
