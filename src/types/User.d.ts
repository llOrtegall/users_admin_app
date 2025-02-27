// Definition of the User type
export interface User {
  id: string;
  names: string;
  lastnames: string;
  username: string;
  email: string;
  company: string;
  process: string;
  sub_process: string;
}

export interface UserListed {
  id: string;
  document: number;
  names: string;
  phone: number;
  lastnames: string;
  username: string;
  email: string;
  company: string;
  process: string;
  sub_process: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
}