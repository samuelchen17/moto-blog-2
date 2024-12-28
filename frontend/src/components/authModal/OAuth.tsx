import { Button } from "../ui/button";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../../config/firebase.config";
import { useAppDispatch } from "../../redux/hooks";
import { signInSuccess } from "../../redux/features/user/userSlice";
import { AuthResponse, isAuthSuccessResponse } from "./AuthForms";
import { toggleAuthModal } from "../../redux/features/modal/authModalSlice";
import { IGoogleAuthPayload } from "src/types";
import axios from "axios";

const OAuth = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth(firebaseApp);
  const handleOAuthClick = async () => {
    const provider = new GoogleAuthProvider();

    // always ask user to select account
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const googleResults = await signInWithPopup(auth, provider);

      // Define the payload using the GoogleAuthPayload type
      const payload: IGoogleAuthPayload = {
        name: googleResults.user.displayName || "",
        email: googleResults.user.email || "",
        dpUrl: googleResults.user.photoURL || "",
      };

      const res = await axios.post<AuthResponse>("/api/auth/google", payload, {
        headers: { "Content-Type": "application/json" },
      });

      const data = res.data;

      if (res.status !== 200) {
        throw new Error(data.message || "An unexpected error occurred");
      }

      // const res: Response = await fetch("/api/auth/google", {
      //   method: "POST",
      //   body: JSON.stringify(payload),
      //   headers: { "Content-Type": "application/json" },
      // });

      // const data: AuthResponse = await res.json();

      // if (!res.ok) {
      //   throw new Error(data.message || "An unexpected error occurred");
      // }

      if (isAuthSuccessResponse(data)) {
        dispatch(signInSuccess(data));
        dispatch(toggleAuthModal());
      } else {
        throw new Error(data.message || "An unexpected error occurred");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Button className="w-full" onClick={handleOAuthClick}>
      <div className="flex-row flex items-center gap-2">
        <AiFillGoogleCircle className="w-6 h-6" />
        Sign in with Google
      </div>
    </Button>
  );
};

export default OAuth;
