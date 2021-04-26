import { EmailOrPasswordWrongError } from "@errors/EmailOrPasswordWrongError";
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import { IAuthenticateUserResponseDTO } from "./IAuthenticateResponseDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    email,
    password,
  }: IRequest): Promise<IAuthenticateUserResponseDTO> {
    const userExist = await this.userRepository.findByEmail(email);
    if (!userExist) throw new EmailOrPasswordWrongError();

    const passwordMatch = await compare(password, userExist.password);
    if (!passwordMatch) throw new EmailOrPasswordWrongError();

    const { secret, expiresIn } = auth.jwt;

    const token = sign({ userExist }, secret, {
      subject: userExist.id,
      expiresIn,
    });

    return {
      user: {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
