import { ModalBody, Checkbox, Button, Label, TextInput } from "flowbite-react";

const AuthSignUp = () => {
  return (
    <ModalBody>
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          SIGNUPPPPPP
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
          <a
            href="#"
            className="text-cyan-700 hover:underline dark:text-cyan-500"
          >
            Log in
          </a>
        </div>
      </div>
    </ModalBody>
  );
};

export default AuthSignUp;
