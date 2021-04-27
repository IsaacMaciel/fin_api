import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { container } from "tsyringe";
import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "./providers/DateProvider/implementations/DayJsDateProvider";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IUsersTokenRepository>("UsersTokenRepository", UsersTokenRepository);
container.registerSingleton<IDateProvider>("DateProvider", DayJsDateProvider);
