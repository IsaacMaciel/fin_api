import { EmailOrPasswordWrongError } from "@errors/EmailOrPasswordWrongError";
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import { IAuthenticateUserResponseDTO } from "./IAuthenticateResponseDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
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

    const token = sign({}, secret, {
      subject: userExist.id,
      expiresIn,
    });

    const refresh_token = sign({ email }, auth.refreshToken.secret, {
      subject: userExist.id,
      expiresIn: auth.refreshToken.expiresIn,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.refreshToken.expiresIn
    );

    await this.usersTokenRepository.create({
      user_id: userExist.id,
      expires_date: refresh_token_expires_date,
      refresh_token,
    });

    return {
      user: {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
