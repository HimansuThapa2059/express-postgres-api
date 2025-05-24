import { db } from "../config/db";
import { eq } from "drizzle-orm";
import { NewUser, users } from "../schema/schema";

export const createUserService = async (
  name: string,
  email: string,
  password: string
) => {
  const newUser: NewUser = { name, email, password };
  const insertedUsers = await db.insert(users).values(newUser).returning();
  return insertedUsers[0];
};

export const getAllUsersService = async () => {
  const allUsers = await db.select().from(users);
  return allUsers;
};

export const getUserByIdService = async (id: string) => {
  const user = await db.select().from(users).where(eq(users.id, id));
  return user[0];
};

export const updateUserService = async (
  id: string,
  name: string,
  email: string,
  password: string
) => {
  const updatedUsers = await db
    .update(users)
    .set({ name, email, password })
    .where(eq(users.id, id))
    .returning();
  return updatedUsers[0];
};

export const deleteUserService = async (id: string) => {
  const deletedUsers = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();
  return deletedUsers[0];
};
