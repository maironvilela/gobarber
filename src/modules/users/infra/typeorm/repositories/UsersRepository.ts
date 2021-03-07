import CreateUserDTO from "@modules/users/dtos/CreateUserDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { EntityRepository, getRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {

    this.ormRepository = getRepository(User)
  }
  save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
  findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { id } })
  }
  findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } })
  }
  create(userData: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)
    const userSave = this.ormRepository.save(user);
    return userSave;
  }


}

export default UsersRepository;
