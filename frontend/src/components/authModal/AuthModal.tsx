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
  DialogTitle,
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
        <DialogHeader className="text-left">
          <AuthLayout isSignIn={isSignIn} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const AuthLayout: React.FC<IAuthLayoutProps> = ({ isSignIn }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-6">
      <DialogTitle> {isSignIn ? "Login" : "Sign Up"}</DialogTitle>

      <DialogDescription>
        <div className="space-y-6">
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
      </DialogDescription>
    </div>
  );
};

export default AuthModal;
