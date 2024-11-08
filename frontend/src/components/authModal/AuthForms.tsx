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
  signUpSuccess,
} from "../../redux/features/user/userSlice";
import {
  toggleAuthModal,
  toggleAuthMode,
} from "../../redux/features/modal/authModalSlice";
import { IErrorRes, ISuccessRes } from "@shared/types/res";
import OAuth from "./OAuth";
import { ISignInAuthPayload, ISignUpAuthPayload } from "@shared/types/auth";

export type AuthResponse = ISuccessRes | IErrorRes;

// type predicate, if return true, data is ISuccessRes
export const isAuthSuccessResponse = (
  data: AuthResponse
): data is ISuccessRes => {
  return data.success === true;
};

export const AuthFormsSignIn = () => {
  const {
    loading: isLoading,
    error: errorMessage,
    success: successMessage,
  } = useAppSelector((state) => state.persisted.user);

  const clearForm: ISignInAuthPayload = { emailOrUsername: "", password: "" };
  const [formData, setFormData] = useState<ISignInAuthPayload>(clearForm);

  const dispatch = useAppDispatch();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const payload: ISignInAuthPayload = { ...formData };

      const res: Response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const data: AuthResponse = await res.json();

      if (!res.ok) {
        // Display the error message from the backend
        dispatch(signInFailure(data.message));
        return; // dispatch does not return
      }

      if (isAuthSuccessResponse(data)) {
        dispatch(signInSuccess(data));
        setFormData(clearForm);
      } else {
        dispatch(signInFailure(data.message));
      }

      dispatch(toggleAuthModal());
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
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="emailOrUsername" value="Your email or username" />
        </div>
        <TextInput
          id="emailOrUsername"
          placeholder=""
          // required
          onChange={handleFormChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          id="password"
          type="password"
          // required
          onChange={handleFormChange}
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
      {successMessage && (
        <Alert color="success">Account created successfully</Alert>
      )}
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
      <OAuth />
    </form>
  );
};

export const AuthFormsSignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clearForm: ISignUpAuthPayload = {
    email: "",
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState<ISignUpAuthPayload>(clearForm);

  // redux
  const dispatch = useAppDispatch();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // clear error message
    setErrorMessage(null);

    try {
      setIsLoading(true);

      const payload: ISignUpAuthPayload = { ...formData };

      const res: Response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const data: AuthResponse = await res.json();

      if (!res.ok) {
        // Display the error message from the backend
        throw new Error(data.message || "An unexpected error occurred");
      }

      dispatch(signUpSuccess());
      // redirect to log in
      dispatch(toggleAuthMode());
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
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Your username" />
        </div>
        <TextInput
          id="username"
          placeholder=""
          // required
          onChange={handleFormChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          // type="email"
          id="email"
          placeholder="name@company.com"
          // required
          onChange={handleFormChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          id="password"
          type="password"
          // required
          onChange={handleFormChange}
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
      <OAuth />
    </form>
  );
};
