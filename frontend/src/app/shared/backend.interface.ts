export interface RegisterUser {
  username: string;

  firstName: string;

  lastName: string;

  neptun: string;

  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
export interface UserProfil {
  username: string;

  firstName: string;

  lastName: string;

  neptun: string;

  createdAt: Date;
}
