import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
