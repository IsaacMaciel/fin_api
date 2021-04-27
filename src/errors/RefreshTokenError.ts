import { AppError } from "./AppError";

class RefreshTokenError extends AppError {
  constructor() {
    super("Refresh Token does not exists !", 401);
  }
}

export { RefreshTokenError };
