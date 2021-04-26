import { AppError } from "./AppError";

class UserAlreadyExistError extends AppError {
  constructor() {
    super("User already exist", 401);
  }
}

export { UserAlreadyExistError };
