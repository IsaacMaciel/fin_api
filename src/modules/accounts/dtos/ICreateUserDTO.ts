interface ICreateUserDTO {
  id?: string;
  name: string;
  password: string;
  email: string;
  isAdmin?: boolean;
}

export { ICreateUserDTO };
