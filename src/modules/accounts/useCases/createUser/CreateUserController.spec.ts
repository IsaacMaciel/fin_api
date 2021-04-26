import { Connection } from "typeorm";
import request from "supertest";
import { app } from "@shared/infra/http/app";
import createConnection from '../../../../shared/infra/typeorm/'

let connection: Connection;
const url = "/api/v1/user/create";

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able create a new user", async () => {
    const response = await request(app).post(url).send({
      name: "Teste User",
      email: "teste@teste.com",
      password: "1234",
    });

    expect(response.body.id).toBeTruthy();
    expect(response.status).toBe(200);
  });

  it("should not be able create a user when email already exist", async () => {
    const response = await request(app).post(url).send({
      name: "Teste User",
      email: "teste@teste.com",
      password: "1234",
    });

    console.log(response)

    expect(response.body.message).toBeTruthy();
    expect(response.status).toBe(401);
  });
});
