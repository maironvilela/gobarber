import ListProviderServier from "@modules/appointments/services/ListProviderService";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";


@injectable()
export default class ProvidersController {



  public async index(request: Request, response: Response): Promise<Response> {

    const userId = request.user.id;

    console.log('USer ID: ' + userId)

    const listProviderServier = container.resolve(ListProviderServier);

    const users = await listProviderServier.execute(
      {
        userId
      }
    )

    return response.status(200).json(users)

  }
}
