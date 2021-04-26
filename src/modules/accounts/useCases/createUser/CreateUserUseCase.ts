import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { UserAlreadyExistError } from "@errors/UserAlreadyExistError";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    isAdmin,
  }: ICreateUserDTO): Promise<User> {
    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) throw new UserAlreadyExistError();
    const user = await this.userRepository.create({
      name,
      email,
      password: await hash(password, 8),
      isAdmin,
    });

    return user;
  }
}

export { CreateUserUseCase };
