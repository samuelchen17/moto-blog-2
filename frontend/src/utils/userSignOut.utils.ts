import { AppDispatch } from "../redux/store";
import { signOutSuccess } from "../redux/features/user/userSlice";

interface IUserSignOutProps {
  dispatch: AppDispatch;
}

const userSignOut = async ({ dispatch }: IUserSignOutProps) => {
  try {
    const res = await fetch("/api/user", {
      method: "POST",
    });

    const data = res.json();

    if (!res.ok) {
      console.log(data);
      throw new Error("sign out failed");
    }
    dispatch(signOutSuccess());
  } catch (err) {
    console.error("Error:", err);
  }
};

export default userSignOut;
