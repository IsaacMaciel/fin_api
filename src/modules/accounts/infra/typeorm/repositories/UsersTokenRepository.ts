import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { getRepository, Repository } from "typeorm";
import { UsersToken } from "../entities/UsersToken";

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UsersToken>;

  constructor() {
    this.repository = getRepository(UsersToken);
  }
 
  async create({
    refresh_token,
    expires_date,
    user_id,
  }: ICreateUsersTokenDTO): Promise<UsersToken> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
  async deleteById(user_id: string): Promise<void> {
    await this.repository.delete(user_id);
  }
  async findRefreshToken(refresh_token: string, user_id: string): Promise<UsersToken> {
    return this.repository.findOne({
      user_id,
      refresh_token
    })
  }

}

export { UsersTokenRepository };
