import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import AuthLogIn from "./AuthLogIn";
import AuthSignIn from "./AuthSignIn";

interface IAuthModalProps {
  authOpen: boolean;
  authMode: string;
}

const AuthModal: React.FC<IAuthModalProps> = ({ authOpen, authMode }) => {
  return (
    <Modal show={authOpen}>
      <ModalHeader />
      <ModalBody>
        {authMode === "login" ? <AuthLogIn /> : <AuthSignIn />}
      </ModalBody>
    </Modal>
  );
};

export default AuthModal;
