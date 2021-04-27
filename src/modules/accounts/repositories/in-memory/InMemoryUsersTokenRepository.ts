import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { UsersToken } from "@modules/accounts/infra/typeorm/entities/UsersToken";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import { IUsersTokenRepository } from "../IUsersTokenRepository";

class InMemoryUsersTokenRepository implements IUsersTokenRepository {
  private repository: UsersToken[] = []

  async create({expires_date,refresh_token,user_id }: ICreateUsersTokenDTO): Promise<UsersToken> {
    const userTokenRepository = new UsersToken()

    Object.assign(userTokenRepository,{
      user_id,
      refresh_token,
      expires_date
    })

    this.repository.push(userTokenRepository)

    return userTokenRepository
  }
  async deleteById(user_id: string): Promise<void> {
    this.repository = this.repository.filter(user => user.user_id !== user_id)
  }
  async findRefreshToken(refresh_token: string, user_id: string): Promise<UsersToken> {
    return this.repository.find(user => (user.refresh_token === refresh_token && user.user_id === user_id))
  }

}

export {  InMemoryUsersTokenRepository }