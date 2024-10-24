import {
  Checkbox,
  Button,
  Label,
  TextInput,
  Alert,
  Spinner,
} from "flowbite-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/features/user/userSlice";
import type { RootState } from "../../redux/store";

export interface IAuthSuccessRes {
  message: string;
  success: true;
  user: string;
}
export interface IAuthErrorRes {
  status: "error";
  success: false;
  statusCode: number;
  message: string;
}

type AuthResponse = IAuthSuccessRes | IAuthErrorRes;

// type predicate, if return true, data is IAuthSuccessRes
const isAuthSuccessResponse = (data: AuthResponse): data is IAuthSuccessRes => {
  return data.success === true;
};

export const AuthFormsSignIn = ({ closeModal }: { closeModal: () => void }) => {
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loading: isLoading, error: errorMessage } = useAppSelector(
    (state) => state.user
  );
  const [formData, setFormData] = useState({});
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // clear error message
    // setErrorMessage(null); // replaced by redux

    dispatch(signInStart());

    try {
      // setIsLoading(true); // replaced by redux

      const res: Response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data: AuthResponse = await res.json();

      if (!res.ok) {
        // Display the error message from the backend
        // throw new Error(data.message || "An unexpected error occurred"); // replaced by redux
        dispatch(signInFailure(data.message));
        return; // dispatch does not return
      }

      if (isAuthSuccessResponse(data)) {
        dispatch(signInSuccess(data));
      } else {
        dispatch(signInFailure(data.message));
      }

      closeModal();
    } catch (err) {
      console.error("Error:", err);

      if (err instanceof Error) {
        // setErrorMessage(err.message);
        dispatch(signInFailure(err.message));
      } else {
        dispatch(signInFailure("An unknown error occurred"));
      }
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email"
          placeholder="name@company.com"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          id="password"
          type="password"
          required
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <a
          href="#"
          className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
        >
          Lost Password?
        </a>
      </div>
      {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
      <div className="w-full">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-2">Loading...</span>{" "}
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </div>
    </form>
  );
};

export const AuthFormsSignUp = ({
  toggleAuthMode,
}: {
  toggleAuthMode: () => void;
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // clear error message
    setErrorMessage(null);

    try {
      setIsLoading(true);

      const res: Response = await fetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data: AuthResponse = await res.json();

      if (!res.ok) {
        // Display the error message from the backend
        throw new Error(data.message || "An unexpected error occurred");
      }

      // redirect to log in
      toggleAuthMode();
    } catch (err) {
      console.error("Error:", err);

      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Your username" />
        </div>
        <TextInput
          id="username"
          placeholder="name@company.com"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email"
          placeholder="name@company.com"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          id="password"
          type="password"
          required
          onChange={handleChange}
        />
      </div>
      {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
      <div className="w-full">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-2">Loading...</span>{" "}
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </div>
    </form>
  );
};
