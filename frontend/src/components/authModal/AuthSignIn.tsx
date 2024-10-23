import { ModalBody } from "flowbite-react";
import { IAuthSignProps } from "./authModal";
import { AuthFormsSignIn } from "./AuthForms";

const AuthSignIn: React.FC<IAuthSignProps> = ({ toggleAuthMode }) => {
  return (
    <ModalBody>
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Login
        </h3>

        {/* sign in form */}
        <AuthFormsSignIn />

        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?&nbsp;
          <button
            onClick={toggleAuthMode}
            className="text-cyan-700 hover:underline dark:text-cyan-500"
          >
            Create account
          </button>
        </div>
      </div>
    </ModalBody>
  );
};

export default AuthSignIn;
