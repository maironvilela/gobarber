import User from "@modules/users/infra/typeorm/entities/User";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import IListProviderDTO from "../dtos/IListProviderDTO";

interface IRequest {
  userId?: string
}


@injectable()
class ListProviderServier {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute({ userId }: IRequest): Promise<User[]> {

    const users = await this.usersRepository.findAllProviders({
      exceptUserId: userId
    })

    return users;

  }

}

export default ListProviderServier
