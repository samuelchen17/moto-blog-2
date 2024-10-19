import { User } from "../models/user.model";
import { userServiceErrorHandler } from "../utils/errorHandler.utils";

export const getUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    userServiceErrorHandler(error, "Unable to get users");
  }
};

export const getUserByEmail = async (
  email: string,
  selectParameter?: string
) => {
  try {
    let query = User.findOne({ email });

    if (selectParameter) {
      query = query.select(selectParameter);
    }

    return await query;
  } catch (error) {
    userServiceErrorHandler(error, "Unable to get user by email");
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    return await User.findOne({ username });
  } catch (error) {
    userServiceErrorHandler(error, "Unable to get user by username");
  }
};

export const getUserBySessionToken = async (sessionToken: string) => {
  try {
    return await User.findOne({ "authentication.sessionToken": sessionToken });
  } catch (error) {
    userServiceErrorHandler(error, "Unable to get user by session token");
  }
};

export const getUserById = async (id: string) => {
  try {
    return await User.findById(id);
  } catch (error) {
    userServiceErrorHandler(error, "Unable to get user by ID");
  }
};

export const createUser = async (values: Record<string, any>) => {
  try {
    const user = new User(values);
    await user.save();
    return user;
  } catch (error) {
    userServiceErrorHandler(error, "Unable to create user");
  }
};

export const deleteUserById = async (id: string) => {
  try {
    return await User.findOneAndDelete({ _id: id });
  } catch (error) {
    userServiceErrorHandler(error, "Unable to delete user by ID");
  }
};

export const updateUserById = async (
  id: string,
  values: Record<string, any>
) => {
  try {
    return await User.findByIdAndUpdate(id, values, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    userServiceErrorHandler(error, "Unable to update user by ID");
  }
};

// export const getUsers = () => User.find();
// export const getUserByEmail = (email: string) => User.findOne({ email });
// // confirm login
// export const getUserBySessionToken = (sessionToken: string) =>
//   User.findOne({ "authentication.sessionToken": sessionToken });
// export const getUserById = (id: string) => User.findById(id);
// export const createUser = (values: Record<string, any>) => new User(values);
// export const deleteUserById = (id: string) =>
//   User.findOneAndDelete({ _id: id });
// export const updateUserById = (id: string, values: Record<string, any>) =>
//   User.findByIdAndUpdate(id, values);
