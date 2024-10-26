import { Navbar } from "flowbite-react";
import helmetIcon from "/helmet.svg";
import { Link, useLocation } from "react-router-dom";
// import { AiOutlineSearch } from "react-icons/ai";
import NavBarLinks from "./NavBarLinks";
import NavBarAuth from "./NavBarAuth";
import NavBarThemeBtn from "./NavBarThemeBtn";

const NavBar = () => {
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2">
      <Navbar.Brand className="flex gap-2" as={Link} to="/">
        <img src={helmetIcon} className="sm:h-[60px] h-[30px] dark:invert" />
        <span className="self-center whitespace-nowrap text-sm sm:text-4xl font-semibold dark:text-white">
          SC MOTO
        </span>
      </Navbar.Brand>
      <div className="flex gap-2 md:order-last">
        <NavBarThemeBtn />
        {/* authentication links */}
        <NavBarAuth />
      </div>
      {/* navigation links */}
      <NavBarLinks currentPath={path} />
    </Navbar>
  );
};

export default NavBar;

{
  /* search bar */
}
{
  /* <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="lg:hidden" color="gray">
        <AiOutlineSearch />
      </Button> */
}
