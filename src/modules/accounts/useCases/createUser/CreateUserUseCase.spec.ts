import { UserAlreadyExistError } from "@errors/UserAlreadyExistError";
import { InMemoryUserRepository } from "@modules/accounts/repositories/in-memory/InMemoryUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let userRepositoryInMemory: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able create a new User", async () => {
    const userCreated = await createUserUseCase.execute({
      name: "Teste User",
      email: "teste@teste.com",
      password: "12345",
    });

    expect(userCreated).toHaveProperty("id");
    expect(userCreated).toHaveProperty("isAdmin");
  });

  it("should not be able create a user when email exist", async () => {
    await createUserUseCase.execute({
      name: "Teste User",
      email: "teste@teste.com",
      password: "12345",
    });

    await expect(
      createUserUseCase.execute({
        name: "Teste User",
        email: "teste@teste.com",
        password: "12345",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistError);
  });
});
