import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import AuthModal from "../authModal/AuthModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  openRegister,
  openLogin,
} from "../../redux/features/modal/authModalSlice";
import { HiUser } from "react-icons/hi";

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
            <Avatar alt="user" rounded img={currentUser.user.profilePicture} />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{currentUser.user.username}</span>
            <span className="block truncate text-sm font-medium">
              {currentUser.user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item as={Link} to={"/dashboard?tab=profile"} icon={HiUser}>
            Profile
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={PiSignOutBold}>Log out</Dropdown.Item>
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

      <Navbar.Toggle />

      {/* authentication modal */}
      <AuthModal />
    </>
  );
};

export default NavBarAuth;
