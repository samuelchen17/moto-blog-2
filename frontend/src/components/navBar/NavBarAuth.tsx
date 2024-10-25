import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  NavbarToggle,
} from "flowbite-react";
import AuthModal from "../authModal/AuthModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { IoMdPerson } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  openRegister,
  openLogin,
} from "../../redux/features/modal/authModalSlice";

const NavBarAuth = () => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  // redux modal
  const dispatch = useAppDispatch();

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
              // img={currentUser.profilePicture} // implement
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
          <Button color="none" onClick={() => dispatch(openLogin())}>
            Log In
          </Button>
          <Button
            className="bg-black dark:bg-white"
            pill
            onClick={() => dispatch(openRegister())}
          >
            Sign Up
          </Button>
        </>
      )}

      <NavbarToggle />

      {/* authentication modal */}
      <AuthModal />
    </>
  );
};

export default NavBarAuth;
