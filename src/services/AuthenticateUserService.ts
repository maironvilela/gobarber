import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserServer {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Email ou senha Invalido');
    }
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Email ou senha Invalido');
    }

    const token = sign(
      {
        email: user.email,
        id: user.id,
      },
      'fe3a5f50885670307b2f51e2d158640a',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return { user, token };
  }
}
export default AuthenticateUserServer;
