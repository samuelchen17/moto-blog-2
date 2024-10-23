import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import AuthSignUp from "./AuthSignUp";
import AuthSignIn from "./AuthSignIn";

interface IAuthModalProps {
  authOpen: boolean;
  authMode: string;
  setAuthOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthMode: React.Dispatch<React.SetStateAction<"login" | "register">>;
}

export interface IAuthSignProps {
  toggleAuthMode: () => void;
}

const AuthModal: React.FC<IAuthModalProps> = ({
  authOpen,
  setAuthOpen,
  authMode,
  setAuthMode,
}) => {
  const closeModal = () => setAuthOpen(!authOpen);

  const toggleAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === "login" ? "register" : "login"));
  };

  return (
    <Modal show={authOpen} dismissible popup size="lg" onClose={closeModal}>
      <ModalHeader />
      <ModalBody>
        {authMode === "login" ? (
          <AuthSignIn toggleAuthMode={toggleAuthMode} />
        ) : (
          <AuthSignUp toggleAuthMode={toggleAuthMode} />
        )}
      </ModalBody>
    </Modal>
  );
};

export default AuthModal;
