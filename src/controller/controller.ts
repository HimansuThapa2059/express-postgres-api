import { Request, Response, NextFunction } from "express";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../model/model";
import { NewUser, SafeUser } from "../schema/schema";

const handleResponse = <T>(
  res: Response,
  status: number,
  message: string,
  data: T | null = null
): void => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (
  req: Request<NewUser>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const newUser: SafeUser = await createUserService(name, email, password);
    handleResponse<SafeUser>(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users: SafeUser[] = await getAllUsersService();
    handleResponse<SafeUser[]>(res, 200, "Users fetched successfully", users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const user: SafeUser | null = await getUserByIdService(id);
    if (!user) {
      handleResponse(res, 404, "User not found");
      return;
    }
    handleResponse<SafeUser>(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request<{ id: string }, NewUser>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedUser: SafeUser | null = await updateUserService(
      id,
      name,
      email
    );

    if (!updatedUser) {
      handleResponse(res, 404, "User not found");
      return;
    }

    handleResponse<SafeUser>(
      res,
      200,
      "User updated successfully",
      updatedUser
    );
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const user: SafeUser | null = await deleteUserService(id);
    if (!user) {
      handleResponse(res, 404, "User not found");
      return;
    }
    handleResponse<SafeUser>(res, 200, "User deleted successfully", user);
  } catch (err) {
    next(err);
  }
};
