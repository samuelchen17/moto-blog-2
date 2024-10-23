import { Checkbox, Button, Label, TextInput } from "flowbite-react";
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

export const AuthFormsSignUp = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    try {
      const res: Response = await fetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data);
      //    sign user in
    } catch (err) {
      console.error("Error:", err);
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
          // value={email}
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Your username" />
        </div>
        <TextInput
          id="username"
          placeholder="name@company.com"
          // value={email}
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
      <div className="w-full">
        <Button type="submit">Create account</Button>
      </div>
    </form>
  );
};
