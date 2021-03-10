import { Response, Request } from "express";
import SendEmailForPasswordRecoverService from "../../../services/SendEmailForPasswordRecoverService";
import { container } from "tsyringe";
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fake/FakeMailProvider";
import UsersTokenRepository from "../../typeorm/repositories/UseresTokenRepository";
import EtherealMailProvider from "@shared/container/providers/MailProvider/implementations/EtherealMailProvider";

export default class ForgotPasswordController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const userRepository = new UsersRepository();
    const mailProvider = new EtherealMailProvider();
    const userTokenRepository = new UsersTokenRepository();


    const sendEmailForPasswordRecoverService = new SendEmailForPasswordRecoverService(
      userRepository,
      mailProvider,
      userTokenRepository,
    )

    /**  const sendEmailForPasswordRecoverService = container.resolve(
      SendEmailForPasswordRecoverService
    );*/


    const userToken = await sendEmailForPasswordRecoverService.execute({ email })

    return response.status(204).json(userToken);
  }
}
