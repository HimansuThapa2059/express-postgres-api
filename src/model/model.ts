import bcrypt from "bcrypt";
import { db } from "../config/db";
import { eq } from "drizzle-orm";
import { NewUser, users } from "../schema/schema";

export const createUserService = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: NewUser = { name, email, password: hashedPassword };
    const insertedUsers = await db.insert(users).values(newUser).returning();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = insertedUsers[0];
    return safeUser;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "23505") {
      throw new Error("Email already exists");
    }

    throw error;
  }
};

export const getAllUsersService = async () => {
  const allUsers = await db.select().from(users);

  const safeUsers = allUsers.map((user) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = user;
    return safeUser;
  });

  return safeUsers;
};

export const getUserByIdService = async (id: string) => {
  const user = await db.select().from(users).where(eq(users.id, id));

  if (user[0]) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = user[0];
    return safeUser;
  }

  return null;
};

export const updateUserService = async (
  id: string,
  name: string,
  email: string
) => {
  const updatedUser = await db
    .update(users)
    .set({ name, email })
    .where(eq(users.id, id))
    .returning();

  if (updatedUser[0]) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = updatedUser[0];
    return safeUser;
  }
  return null;
};

export const deleteUserService = async (id: string) => {
  const deletedUser = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();

  if (deletedUser[0]) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = deletedUser[0];
    return safeUser;
  }

  return null;
};
