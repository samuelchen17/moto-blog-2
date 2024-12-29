import { AppDispatch } from "../redux/store";
import { signOutSuccess } from "../redux/features/user/userSlice";
import { _post } from "@/api/axiosClient";

interface IUserSignOutProps {
  dispatch: AppDispatch;
}

const userSignOut = async ({ dispatch }: IUserSignOutProps) => {
  try {
    await _post("/user");

    dispatch(signOutSuccess());
  } catch (err) {
    console.error("Error:", err);
  }
};

export default userSignOut;
