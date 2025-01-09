export interface User {
  name: string;
  email: string;
  id: string;
  createdAt?: string;
}

export type LoginUser = {
  name: string;
  email: string;
}