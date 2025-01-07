import { Request, Response } from 'express';
import { createUserService, getUsersService, loginUserService } from '../services/user-services.js';


export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user } = req.body;
    if (!user.name || user.name.trim() === "" || !user.email || user.email.trim() === "") {
      throw new Error("Invalid user data");
    }
    const userDb = await createUserService(user);
    console.log(new Date(), "User created", user.name)
    res.status(201).json(userDb);
  } catch (error: any) {
    console.log(new Date(), error);

    if (error.message === "Invalid user data") {
      return res.status(400).json({ message: error.message });
    }

    if (error?.code === "P2002") {
      return res.status(409).json({ message: "Email already in use" });
    }
    res.status(500).json({ message: error?.message || "Failed to fetch", type: 'Network error' });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (error: any) {

    res.status(500).json({ message: 'Failed to fetch users', error: error?.message });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await loginUserService(email);
    if (!user) {
      res.status(404).json({ message: 'User account not found' });
      console.log(new Date(), "User account not found:", email)
    }
    else {
      console.log(new Date(), "Login user:", email)
      res.status(200).json({ message: 'Login successful', user });
    }
  } catch (error) {
    console.log(new Date(), "loginUser", error);
    res.status(500).json({ message: 'Failed to login' });
  }
};
