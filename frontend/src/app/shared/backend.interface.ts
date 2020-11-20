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
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  neptun: string;
  createdAt: Date;
}

export interface Subject {
  id: number;
  name: string;
}
