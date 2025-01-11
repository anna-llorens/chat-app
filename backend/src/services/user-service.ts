import prisma from '../prisma.js';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string
}

export const createUserService = async (data: { name: string; email: string }) => {
  return prisma.user.create({ data });
};

export const getUsersService = async () => {
  return prisma.user.findMany();
};

export const loginUserService = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const deleteUserService = async (id: string): Promise<any> => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const editUserService = async (data: Partial<User>, id: string): Promise<any> => {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

