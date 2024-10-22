import { Button, Navbar, NavbarBrand, TextInput } from "flowbite-react";
import helmetIcon from "/helmet.svg";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import NavBarLinks from "./NavBarLinks";

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
      <NavBarLinks currentPath={path} />
    </Navbar>
  );
};

export default NavBar;
