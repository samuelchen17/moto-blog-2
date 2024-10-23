import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import AuthSignUp from "./AuthSignUp";
import AuthSignIn from "./AuthSignIn";

interface IAuthModalProps {
  authOpen: boolean;
  authMode: string;
}

const AuthModal: React.FC<IAuthModalProps> = ({ authOpen, authMode }) => {
  return (
    <Modal show={authOpen} popup>
      <ModalHeader />
      <ModalBody>
        {authMode === "login" ? <AuthSignIn /> : <AuthSignUp />}
      </ModalBody>
    </Modal>
  );
};

export default AuthModal;
