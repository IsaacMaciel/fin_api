import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUserRepository } from "../IUserRepository";

class InMemoryUserRepository implements IUserRepository {
  repository: User[] = [];

  async create({
    name,
    email,
    password,
    isAdmin = false,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      password,
      isAdmin,
    });

    await this.repository.push(user);
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    return await this.repository.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return await this.repository.find((user) => user.id === id);
  }
}

export { InMemoryUserRepository };
