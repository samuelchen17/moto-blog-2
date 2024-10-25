import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
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
import { Link } from "react-router-dom";

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
    <>
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
            <span>{currentUser.user.username}</span>
          </DropdownHeader>
          <DropdownItem as={Link} to={"/dashboard?tab=profile"}>
            <IoMdPerson />
            Profile
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem>
            <PiSignOutBold />
            Log out
          </DropdownItem>
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
    </>
  );
};

export default NavBarAuth;
