import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { AuthFormsSignIn, AuthFormsSignUp } from "./AuthForms";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  toggleAuthModal,
  toggleAuthMode,
} from "../../redux/features/modal/authModalSlice";
import { RootState } from "../../redux/store";

interface IAuthModalProps {
  authOpen: boolean;
  authMode: string;
}

interface IAuthLayoutProps {
  closeModal: () => void;
  toggleAuthMode: () => void;
  isSignIn: boolean;
}

const AuthModal = () => {
  const { authOpen, authMode } = useAppSelector(
    (state: RootState) => state.authModal
  );
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(toggleAuthModal());
  const isSignIn = authMode === "login";
  // const toggleAuthMode = () => {
  //   setAuthMode((prevMode) => (prevMode === "login" ? "register" : "login"));
  // };

  return (
    <Modal show={authOpen} dismissible popup size="lg" onClose={closeModal}>
      <ModalHeader />
      <ModalBody>
        <AuthLayout
          toggleAuthMode={() => {
            dispatch(toggleAuthMode());
          }}
          isSignIn={isSignIn}
          closeModal={closeModal}
        />
      </ModalBody>
    </Modal>
  );
};

const AuthLayout: React.FC<IAuthLayoutProps> = ({
  closeModal,
  toggleAuthMode,
  isSignIn,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        {isSignIn ? "Login" : "Sign Up"}
      </h3>

      {/* sign in form */}
      {isSignIn ? (
        <AuthFormsSignIn closeModal={closeModal} />
      ) : (
        <AuthFormsSignUp toggleAuthMode={toggleAuthMode} />
      )}

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
  );
};

export default AuthModal;
