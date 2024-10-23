import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import AuthSignUp from "./AuthSignUp";
import AuthSignIn from "./AuthSignIn";
import { AuthFormsSignIn, AuthFormsSignUp } from "./AuthForms";

interface IAuthModalProps {
  authOpen: boolean;
  authMode: string;
  setAuthOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthMode: React.Dispatch<React.SetStateAction<"login" | "register">>;
}

export interface IAuthSignProps {
  toggleAuthMode: () => void;
}

interface IAuthLayoutProps {
  toggleAuthMode: () => void;
  isSignIn: boolean;
}

const AuthModal: React.FC<IAuthModalProps> = ({
  authOpen,
  setAuthOpen,
  authMode,
  setAuthMode,
}) => {
  const closeModal = () => setAuthOpen(!authOpen);
  const isSignIn = authMode === "login";
  const toggleAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === "login" ? "register" : "login"));
  };

  return (
    <Modal show={authOpen} dismissible popup size="lg" onClose={closeModal}>
      <ModalHeader />
      <AuthLayout toggleAuthMode={toggleAuthMode} isSignIn={isSignIn} />
    </Modal>
  );
};

const AuthLayout: React.FC<IAuthLayoutProps> = ({
  toggleAuthMode,
  isSignIn,
}) => {
  return (
    <ModalBody>
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          {isSignIn ? "Login" : "Sign Up"}
        </h3>

        {/* sign in form */}
        {isSignIn ? <AuthFormsSignIn /> : <AuthFormsSignUp />}

        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
          {isSignIn ? "Not registered?" : "Have an account?"}&nbsp;
          <button
            onClick={toggleAuthMode}
            className="text-cyan-700 hover:underline dark:text-cyan-500"
          >
            {isSignIn ? "Create account" : "Log in "}
          </button>
        </div>
      </div>
    </ModalBody>
  );
};

export default AuthModal;
