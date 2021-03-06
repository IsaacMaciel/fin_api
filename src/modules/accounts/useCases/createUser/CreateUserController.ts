import { UserMap } from "@modules/accounts/mappers/UserMap";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, isAdmin } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      isAdmin,
    });

    const userDTO = UserMap.toDTO(user)
    return res.status(200).json(userDTO);
  }
}

export { CreateUserController };
