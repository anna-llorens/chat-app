import { Request, Response } from 'express';
import { createUserService, getUsersService, loginUserService } from '../services/user-services.js';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await createUserService({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await loginUserService(email);

    if (!user) {
      res.status(404).json({ message: 'User account not found' });
    }
    else {
      res.status(200).json({ message: 'Login successful', user });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error });
  }
};
