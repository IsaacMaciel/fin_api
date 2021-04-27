import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UsersToken } from "../infra/typeorm/entities/UsersToken";

interface IUsersTokenRepository {
  create({}: ICreateUsersTokenDTO): Promise<UsersToken>;
  deleteById(user_id: string): Promise<void>;
  findRefreshToken(refresh_token: string, user_id: string): Promise<UsersToken>
}

export { IUsersTokenRepository };
