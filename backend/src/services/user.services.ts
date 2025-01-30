import { User } from "../models/user.model";
import { userServiceErrorHandler } from "../utils/errorHandler.utils";
import config from "../config/config";

// ADD FIELDS HERE FOR LOGIN OBJECT
const defaultFields = config.loginResponseDefaultFields;

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
      query = query.select(`${defaultFields} ${selectParameter}`);
    } else {
      query = query.select(defaultFields);
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

export const getUserByEmailOrUsername = async (
  emailOrUsername: string,
  selectParameter?: string
) => {
  try {
    let query = User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (selectParameter) {
      query = query.select(`${defaultFields} ${selectParameter}`);
    } else {
      query = query.select(defaultFields);
    }

    // if (selectParameter) {
    //   query = query.select(`+${selectParameter}`);
    // }

    return await query;
  } catch (error) {
    userServiceErrorHandler(error, "Unable to get user by email or username");
  }
};

// returns value of isAdmin property
export const checkAdminById = async (
  id: string
): Promise<boolean | undefined> => {
  try {
    const user = await User.findById(id);
    return user?.isAdmin;
  } catch (error) {
    userServiceErrorHandler(error, "Unable to check if user is an admin");
  }
};
