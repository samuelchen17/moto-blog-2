import { Modal } from "flowbite-react";
import { AuthFormsSignIn, AuthFormsSignUp } from "./AuthForms";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  toggleAuthModal,
  toggleAuthMode,
} from "../../redux/features/modal/authModalSlice";
import { RootState } from "../../redux/store";

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
    <Modal show={authOpen} dismissible popup size="lg" onClose={closeModal}>
      <Modal.Header />
      <Modal.Body>
        <AuthLayout isSignIn={isSignIn} />
      </Modal.Body>
    </Modal>
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
        {isSignIn ? "Not registered?" : "Have an account?"}&nbsp;
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
