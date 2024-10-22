import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  TextInput,
} from "flowbite-react";
import helmetIcon from "/helmet.svg";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const NavBar = () => {
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2">
      <NavbarBrand as={Link} to="/">
        <img src={helmetIcon} className="h-[60px] dark:invert" />
        <span className="self-center whitespace-nowrap text-sm sm:text-4xl font-semibold dark:text-white">
          SC MOTO
        </span>
      </NavbarBrand>

      {/* search bar */}
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="lg:hidden" color="gray">
        <AiOutlineSearch />
      </Button>

      {/* links */}
      <NavbarCollapse>
        <NavbarLink as={Link} to="home" active={path === "/home"}>
          HOME
        </NavbarLink>
        <NavbarLink
          className=""
          as={Link}
          to="dashboard"
          active={path === "/dashboard"}
        >
          DASH
        </NavbarLink>
        <NavbarLink
          className=""
          as={Link}
          to="dashboard"
          active={path === "/dashboard"}
        >
          BLOGS
        </NavbarLink>
        <NavbarLink
          className=""
          as={Link}
          to="dashboard"
          active={path === "/dashboard"}
        >
          ABOUT
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavBar;
