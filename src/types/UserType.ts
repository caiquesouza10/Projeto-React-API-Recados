import Recados from './RecadosType';

export interface LoginUserI {
  email: string;
  password: string;
}

export interface UserLogged {
  name: string;
  id: string;
  email: string;
}

export interface CreateUserI {
  email: string;
  password: string;
  repassword?: string;
  recados?: Recados[];
}

