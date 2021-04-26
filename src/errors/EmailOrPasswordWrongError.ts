import { AppError } from "./AppError";


class EmailOrPasswordWrongError extends AppError {
  constructor(){
    super("Email or Password Wrong",401)
  }
}

export { EmailOrPasswordWrongError}