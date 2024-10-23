import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import AuthSignUp from "./AuthSignUp";
import AuthSignIn from "./AuthSignIn";

interface IAuthModalProps {
  authOpen: boolean;
  authMode: string;
  setAuthOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthMode: React.Dispatch<React.SetStateAction<"login" | "register">>;
}

const AuthModal: React.FC<IAuthModalProps> = ({
  authOpen,
  authMode,
  setAuthMode,
  setAuthOpen,
}) => {
  const closeModal = () => setAuthOpen(!authOpen);
  return (
    <Modal show={authOpen} dismissible popup size="lg" onClose={closeModal}>
      <ModalHeader />
      <ModalBody>
        {authMode === "login" ? <AuthSignIn /> : <AuthSignUp />}
      </ModalBody>
    </Modal>
  );
};

export default AuthModal;
