import prisma from "./prisma";
import bcrypt from "bcrypt";

export const getlistUser = async () => {
  return await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      status: true,
      site: true,
    },
  });
};

export const checkUserExist = async (username: string) => {
  try {
    const result: any = await prisma.$queryRaw<
      { count: bigint }[]
    >`SELECT COUNT(*)::bigint as count FROM users WHERE username = ${username}`;

    return result[0].count > 0;
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw error;
  }
};

export const createUser = async (
  name: string,
  username: string,
  password: string,
  email: string,
  role: string,
  status: string,
  site: string,
  created_user: string,
  updated_user: string
) => {
  try {
    return await prisma.users.create({
      data: {
        name: name,
        username: username,
        password: password,
        email: email,
        role: role,
        status: status,
        site: site,
        created_at: new Date(),
        created_user: created_user,
        updated_at: new Date(),
        updated_user: updated_user,
      },
    });
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};

export const updateUser = async (
  name: string,
  email: string,
  password: string,
  id: string,
  role: string,
  status: string,
  site: string,
  updated_user: string
) => {
  try {
    const idAsNumber = Number(id);
    return await prisma.users.update({
      where: { id: idAsNumber },
      data: {
        name: name,
        email: email,
        role: role,
        site: site,
        password: password,
        status: status,
        updated_at: new Date(),
        updated_user: updated_user,
      },
    });
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

export const deleteUsr = async (id: string, updated_user: string) => {
  try {
    const idAsNumber = Number(id);
    return await prisma.users.update({
      where: { id: idAsNumber },
      data: {
        status: "X",
        updated_at: new Date(),
        updated_user: updated_user,
      },
    });
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.users.findFirst({
    where: { email },
  });
  if (!user || !user.password) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  return {
    id: user.id,
    email: user.email,
    username: user.username, // if you have it
  };
};
