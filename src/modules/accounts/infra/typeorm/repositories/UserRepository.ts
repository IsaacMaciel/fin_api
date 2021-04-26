import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    id,
    isAdmin = false,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      email,
      password,
      isAdmin,
    });

    return this.repository.save(user);
  }
  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }
  async findById(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }
}

export { UserRepository };
