import { AuthFormsSignIn, AuthFormsSignUp } from "./AuthForms";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  toggleAuthModal,
  toggleAuthMode,
} from "../../redux/features/modal/authModalSlice";
import { RootState } from "../../redux/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";

interface IAuthLayoutProps {
  isSignIn: boolean;
}

const AuthModal = () => {
  const { authOpen, authMode } = useAppSelector(
    (state: RootState) => state.authModal
  );
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(toggleAuthModal());
  const isSignIn = authMode === "login";

  return (
    <Dialog open={authOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <AuthLayout isSignIn={isSignIn} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const AuthLayout: React.FC<IAuthLayoutProps> = ({ isSignIn }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        {isSignIn ? "Login" : "Sign Up"}
      </h3>

      {/* sign in form */}
      {isSignIn ? <AuthFormsSignIn /> : <AuthFormsSignUp />}

      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
        {isSignIn ? (
          <Label>Not registered?</Label>
        ) : (
          <Label>Have an account?</Label>
        )}
        &nbsp;
        <button
          onClick={() => dispatch(toggleAuthMode())}
          className="text-black underline dark:text-white"
        >
          {isSignIn ? "Create account" : "Log in "}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
