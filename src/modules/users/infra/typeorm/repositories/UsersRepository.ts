import CreateUserDTO from "@modules/users/dtos/CreateUserDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { EntityRepository, getRepository, Repository } from "typeorm";
import User from "../entities/User";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {

    this.ormRepository = getRepository(User)
  }
  public async find(): Promise<User[]> {
    return await this.ormRepository.find();
  }
  public async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }
  public async findById(id: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({ where: { id } })
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({ where: { email } })
  }
  public async create(userData: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)
    const userSave = await this.ormRepository.save(user);
    return userSave;
  }


}

export default UsersRepository;
