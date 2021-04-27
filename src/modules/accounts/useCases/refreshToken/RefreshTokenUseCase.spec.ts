import { InMemoryUserRepository } from "@modules/accounts/repositories/in-memory/InMemoryUserRepository";
import { InMemoryUsersTokenRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersTokenRepository";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

let refreshTokenUseCase: RefreshTokenUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersTokenRepositoryInMemory: InMemoryUsersTokenRepository;
let userRepositoryInMemory: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayJsDateProvider;

describe("Refresh Token Use Case", () => {
  beforeEach(() => {
    dateProvider = new DayJsDateProvider();
    userRepositoryInMemory = new InMemoryUserRepository();
    usersTokenRepositoryInMemory = new InMemoryUsersTokenRepository()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider
    );
    refreshTokenUseCase = new RefreshTokenUseCase(
      usersTokenRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able generate new Token with refresh token", async () => {
    const user = await createUserUseCase.execute({
      name: "teste",
      email: "teste@teste.com",
      password: "1234"
    });

    const { refresh_token } = await authenticateUserUseCase.execute({
      email: "teste@teste.com",
      password: "1234",
    });
    
    const resp = await refreshTokenUseCase.execute(refresh_token);

    expect(resp.refresh_token).toBeTruthy();
    expect(resp.token).toBeTruthy();
  });
});
