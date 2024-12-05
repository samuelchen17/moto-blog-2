import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Button } from "../ui/button";
import AuthModal from "../authModal/AuthModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  openRegister,
  openLogin,
} from "../../redux/features/modal/authModalSlice";
import { dashNavItems } from "../../config/dashNavItems.config";
import userSignOut from "../../utils/userSignOut.utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

const NavBarAuth = () => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  // redux modal
  const dispatch = useAppDispatch();

  return (
    <>
      {currentUser ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar
                alt="user"
                rounded
                img={currentUser.user.profilePicture}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuLabel>
                <span className="block text-sm">
                  {currentUser.user.username}
                </span>
                <span className="block truncate text-sm font-medium">
                  {currentUser.user.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                rounded
                img={currentUser.user.profilePicture}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.user.username}</span>
              <span className="block truncate text-sm font-medium">
                {currentUser.user.email}
              </span>
            </Dropdown.Header>

            {dashNavItems
              .filter((item) => !item.admin || currentUser?.user.admin)
              .map((item) => (
                <Dropdown.Item
                  key={item.name}
                  as={Link}
                  to={item.path}
                  icon={item.icon}
                  className="capitalize"
                >
                  {item.name}
                </Dropdown.Item>
              ))}

            <Dropdown.Divider />
            <Dropdown.Item
              icon={PiSignOutBold}
              onClick={() => userSignOut({ dispatch })}
            >
              Sign Out
            </Dropdown.Item>
          </Dropdown>
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => dispatch(openLogin())}
          >
            Log In
          </Button>
          <Button
            className="rounded-full"
            onClick={() => dispatch(openRegister())}
          >
            Sign Up
          </Button>
        </>
      )}

      {/* <Navbar.Toggle /> */}

      {/* authentication modal */}
      <AuthModal />
    </>
  );
};

export default NavBarAuth;
