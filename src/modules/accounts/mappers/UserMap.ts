import { User } from "../infra/typeorm/entities/User";


class UserMap {
  static toDTO({name,email}:User) {
    return {
      name,
      email
    }
  }
}

export { UserMap }