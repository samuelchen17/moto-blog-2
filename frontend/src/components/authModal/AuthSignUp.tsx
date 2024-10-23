import { ModalBody, Button, Label, TextInput } from "flowbite-react";
import { IAuthSignProps } from "./authModal";

const AuthSignUp: React.FC<IAuthSignProps> = ({ toggleAuthMode }) => {
  return (
    <ModalBody>
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          SIGN UP
        </h3>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            placeholder="name@company.com"
            // value={email}
            // onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput id="password" type="password" required />
        </div>
        <div className="w-full">
          <Button>Create account</Button>
        </div>
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
