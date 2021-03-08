import CreateUserDTO from "@modules/users/dtos/CreateUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";
import { uuid } from "uuidv4";
import IUsersRepository from "../IUsersRepository";



class FakeUsersRepositories implements IUsersRepository {

  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData)
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {

    const index = this.users.findIndex(findIndex => findIndex.id === user.id);
    this.users[index] = user;
    return user;
  }

  public async find(): Promise<User[]> {
    return this.users;
  }

}

export default FakeUsersRepositories;
