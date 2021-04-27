import { User } from "@modules/accounts/infra/typeorm/entities/User";

export interface IAuthenticateUserResponseDTO {
  token: string;
  refresh_token: string;
  user: Pick<User, "id" | "name" | "email">;
}
