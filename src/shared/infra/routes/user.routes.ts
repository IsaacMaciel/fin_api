import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { Router } from "express";

const createUserController = new CreateUserController();

const userRouter = Router();

userRouter.post("/create", createUserController.handle);

export { userRouter };
