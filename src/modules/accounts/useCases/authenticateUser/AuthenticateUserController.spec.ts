import { Connection } from "typeorm";
import request from "supertest";
import { app } from "@shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;
const baseURL = "/api/v1";

describe("Authenticate User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to get token", async () => {
    await request(app).post(`${baseURL}/user/create`).send({
      name: "Teste User",
      email: "teste@teste.com",
      password: "1234",
    });

    const response = await request(app).post(`${baseURL}/session/login`).send({
      email: "teste@teste.com",
      password: "1234",
    });

    expect(response.body.token).toBeTruthy();
    expect(response.body.refresh_token).toBeTruthy();
    expect(response.body.user.id).toBeTruthy();
    expect(response.body.user.name).toBeTruthy();
    expect(response.body.user.email).toBeTruthy();
    expect(response.status).toBe(200);
  });

  it("should not be able to autenticate when email is wrong", async () => {

    const response = await request(app).post(`${baseURL}/session/login`).send({
      email: "teste55@teste.com",
      password: "1234",
    });


    expect(response.body.message).toBe('Email or Password Wrong')
    expect(response.status).toBe(401)
  })

  it("should not be able to autenticate when email is wrong", async () => {

    const response = await request(app).post(`${baseURL}/session/login`).send({
      email: "teste@teste.com",
      password: "123455",
    });

    expect(response.body.message).toBe('Email or Password Wrong')
    expect(response.status).toBe(401)
  })
});

