import { Navbar } from "flowbite-react";
import helmetIcon from "/helmet.svg";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import NavBarLinks from "./NavBarLinks";
import NavBarAuth from "./NavBarAuth";
import NavBarThemeBtn from "./NavBarThemeBtn";
import { Button } from "../ui/button";

const NavBar = () => {
  const path = useLocation().pathname;

  return (
    <nav className="flex flex-row justify-between max-w-screen-xl mx-auto h-[80px] items-center">
      <Link className="flex gap-2" to="/home">
        <img src={helmetIcon} className="sm:h-[50px] h-[30px] dark:invert" />
        <span className="self-center whitespace-nowrap text-sm sm:text-4xl font-semibold dark:text-white">
          SC MOTO
        </span>
      </Link>
      <div className="flex gap-2 md:order-last">
        <NavBarThemeBtn />

        <Button className="rounded-full" color="gray">
          <AiOutlineSearch />
        </Button>
        {/* authentication links */}
        <NavBarAuth />
      </div>
      {/* navigation links */}
      <NavBarLinks currentPath={path} />
    </nav>
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
