import {
  Checkbox,
  Button,
  Label,
  TextInput,
  Alert,
  Spinner,
} from "flowbite-react";
import { useState } from "react";

export const AuthFormsSignIn = () => {
  return (
    <form className="space-y-6">
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
      <div className="w-full">
        <Button type="submit">Log in</Button>
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

      const data = await res.json();

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
