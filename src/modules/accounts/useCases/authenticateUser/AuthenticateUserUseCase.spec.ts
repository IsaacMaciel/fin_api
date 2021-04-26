import { EmailOrPasswordWrongError } from "@errors/EmailOrPasswordWrongError";
import { InMemoryUserRepository } from "@modules/accounts/repositories/in-memory/InMemoryUserRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: InMemoryUserRepository

describe("AuthenticateUserUseCase", () => {
  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUserRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  it("should be able to generate token", async () => {
    await createUserUseCase.execute({
      name: "Teste User",
      email: "teste@teste.com",
      password: "123456",
    })

    const resp = await  authenticateUserUseCase.execute({
      email: "teste@teste.com",
      password: "123456"
    })

    expect(resp.token).toBeTruthy()
  })

  it("should to display error when email  is wrong", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "teste@teste.com",
      password: "123456"
    })).rejects.toBeInstanceOf(EmailOrPasswordWrongError)
  })

  it("should to display error when password is wrong", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "teste@teste.com",
      password: "123456"
    })).rejects.toBeInstanceOf(EmailOrPasswordWrongError)
  })

})