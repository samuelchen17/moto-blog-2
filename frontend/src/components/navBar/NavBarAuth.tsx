import { Avatar } from "flowbite-react";
import { Button } from "../ui/button";
import AuthModal from "../authModal/AuthModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import {
  openRegister,
  openLogin,
} from "../../redux/features/modal/authModalSlice";
import {
  dashAdminNavItems,
  dashUserNavItems,
} from "../../config/dashNavItems.config";
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
import React from "react";

const NavBarAuth = () => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const { notificationsCount } = useAppSelector(
    (state: RootState) => state.contactNotification
  );

  // redux modal
  const dispatch = useAppDispatch();

  return (
    <>
      {currentUser ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="relative">
              <Avatar
                alt="user"
                rounded
                img={currentUser.user.profilePicture}
              />

              {/* notification badge */}
              {notificationsCount > 0 && (
                <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-md">
                  {notificationsCount}
                </span>
              )}
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

              {/* main */}
              {/* user */}
              <DropdownMenuGroup>
                {dashUserNavItems.map((item) => (
                  <Link to={item.path} key={item.name}>
                    <DropdownMenuItem className="capitalize">
                      {item.icon &&
                        React.createElement(item.icon, {
                          className: "mr-1 h-4 w-4",
                        })}
                      <span> {item.name}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuGroup>

              {/* admin */}
              {currentUser.user.admin && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {dashAdminNavItems.map((item) => (
                      <Link to={item.path} key={item.name}>
                        <DropdownMenuItem className="capitalize">
                          {item.icon &&
                            React.createElement(item.icon, {
                              className: "mr-1 h-4 w-4",
                            })}
                          <span> {item.name}</span>
                          {notificationsCount > 0 && item.label && (
                            <span className="ml-auto text-xs tracking-widest px-1.5 rounded-md bg-red-600 text-white">
                              {notificationsCount}
                            </span>
                          )}
                        </DropdownMenuItem>
                      </Link>
                    ))}
                  </DropdownMenuGroup>
                </>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => userSignOut({ dispatch })}>
                <LogOut className="mr-1" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            className="rounded-full sm:block hidden"
            onClick={() => dispatch(openLogin())}
          >
            Log In
          </Button>
          <Button
            className="rounded-full hidden lg:block"
            onClick={() => dispatch(openRegister())}
          >
            Sign Up
          </Button>
          <button onClick={() => dispatch(openLogin())}>
            <User className=" sm:hidden " size={24} />
          </button>
        </>
      )}

      {/* <Navbar.Toggle /> */}

      {/* authentication modal */}
      <AuthModal />
    </>
  );
};

export default NavBarAuth;
