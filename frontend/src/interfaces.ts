import { AxiosError } from "axios";

export interface LoginUser {
  name: string;
  email: string;
}

export interface User extends LoginUser {
  id: string;
  createdAt?: string;
}

export interface Message {
  id: number;
  content: string;
  senderId: string;
  time: string;
  chatId: string;
}

interface ApiErrorResponse {
  message: string;
}

export interface AppError extends AxiosError {
  response: {
    data: ApiErrorResponse;
    status: number;
    statusText: string;
    headers: any;
    config: any;
  };
}