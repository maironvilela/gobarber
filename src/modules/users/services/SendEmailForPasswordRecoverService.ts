import User from '@entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import FakeUsersTokenRepository from '../repositories/fake/FakeUsersTokenRepository';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';
import UsersToken from '../infra/typeorm/entities/UsersToken';

interface Request {
  email: string;
}
@injectable()
class SendEmailForPasswordRecoverService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokenRepository')
    private fakeUsersTokenRepository: IUsersTokenRepository
  ) { }


  public async execute({ email }: Request): Promise<UsersToken> {

    const userFind = await this.userRepository.findByEmail(email);

    if (!userFind) {
      throw new AppError('Usuario inexistente')
    }

    //recebe um tokem que será enviado por email para reset da senha
    const userToken = await this.fakeUsersTokenRepository.generate(userFind.id);

    this.mailProvider.sendMail(
      email,
      'Email de para recuperação de senha recebido'
    )

    return userToken;



  }
}

export default SendEmailForPasswordRecoverService;
