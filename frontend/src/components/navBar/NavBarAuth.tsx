import {
  Avatar,
  Button,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  NavbarToggle,
} from "flowbite-react";
import { useState } from "react";
import AuthModal from "../authModal/AuthModal";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { IoMdPerson } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";

const NavBarAuth = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const { currentUser } = useAppSelector((state: RootState) => state.user);

  // const toggleModal = () => setAuthOpen(!authOpen);
  // const toggleAuthMode = () =>
  //   setAuthMode(authMode === "login" ? "register" : "login");

  const toggleModal = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="flex gap-2 md:order-last">
      {currentUser ? (
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="user"
              rounded
              // img={currentUser.profilePicture}
            />
          }
        >
          <DropdownHeader>
            <DropdownItem>{currentUser.user.username}</DropdownItem>
            <DropdownItem>
              <IoMdPerson />
              Profile
            </DropdownItem>
            <DropdownItem>
              <PiSignOutBold />
              Log out
            </DropdownItem>
          </DropdownHeader>
        </Dropdown>
      ) : (
        <>
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
        </>
      )}

      <NavbarToggle />

      {/* authentication modal */}
      <AuthModal
        authOpen={authOpen}
        authMode={authMode}
        setAuthOpen={setAuthOpen}
        setAuthMode={setAuthMode}
      />
    </div>
  );
};

export default NavBarAuth;
