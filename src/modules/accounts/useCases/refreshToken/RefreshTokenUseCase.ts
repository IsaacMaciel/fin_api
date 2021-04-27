import auth from "@config/auth";
import { RefreshTokenError } from "@errors/RefreshTokenError";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokensRepository: IUsersTokenRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.refreshToken.secret) as IPayload;

    const user_id = sub;

    const userToken = await this.usersTokensRepository.findRefreshToken(
      token,
      user_id
    );

    if (!userToken) throw new RefreshTokenError();

    const expires_date = this.dateProvider.addDays(auth.refreshToken.expiresIn);
    const refresh_token = sign({ email }, auth.refreshToken.secret, {
      subject: user_id,
      expiresIn: auth.refreshToken.expiresIn,
    });

    await this.usersTokensRepository.deleteById(user_id);

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, auth.jwt.secret, {
      subject: user_id,
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };
