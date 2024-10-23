import { Button, NavbarToggle } from "flowbite-react";
import { useState } from "react";
import AuthModal from "../authModal/authModal";

const NavBarAuth = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  // const toggleModal = () => setAuthOpen(!authOpen);
  // const toggleAuthMode = () =>
  //   setAuthMode(authMode === "login" ? "register" : "login");

  const toggleModal = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="flex gap-2 md:order-last">
      <Button color="none" onClick={() => toggleModal("login")}>
        Log In
      </Button>
      <Button
        className="bg-black dark:bg-white"
        pill
        onClick={() => toggleModal("register")}
      >
        Sign Up
      </Button>
      <NavbarToggle />

      {/* authentication modal */}
      <AuthModal authOpen={authOpen} authMode={authMode} />
    </div>
  );
};

export default NavBarAuth;
