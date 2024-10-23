import { ModalBody } from "flowbite-react";
import { IAuthSignProps } from "./authModal";
import { AuthFormsSignUp } from "./AuthForms";

const AuthSignUp: React.FC<IAuthSignProps> = ({ toggleAuthMode }) => {
  return (
    <ModalBody>
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          SIGN UP
        </h3>

        {/* sign in form */}
        <AuthFormsSignUp />

        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
          Have an account?&nbsp;
          <button
            onClick={toggleAuthMode}
            className="text-cyan-700 hover:underline dark:text-cyan-500"
          >
            Log in
          </button>
        </div>
      </div>
    </ModalBody>
  );
};

export default AuthSignUp;
