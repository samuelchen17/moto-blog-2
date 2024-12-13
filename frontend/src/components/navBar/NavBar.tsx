// import { Navbar } from "flowbite-react";
import helmetIcon from "/helmet.svg";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import NavBarLinks from "./NavBarLinks";
import NavBarAuth from "./NavBarAuth";
import NavBarThemeBtn from "./NavBarThemeBtn";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const NavBar = () => {
  const path = useLocation().pathname;

  return (
    <nav className="flex flex-row justify-between max-w-screen-xl mx-auto h-[80px] items-center px-4">
      <div className="flex items-center gap-2">
        {/* navbar collapse */}
        <Menu className="md:hidden" size={30} />

        {/* navbar icon */}
        <Link className="flex gap-2" to="/home">
          <img src={helmetIcon} className="sm:h-[50px] h-[30px] dark:invert" />
          <span className="self-center whitespace-nowrap text-sm sm:text-4xl font-semibold dark:text-white">
            SC MOTO
          </span>
        </Link>
      </div>

      <div className="flex gap-2 md:order-last">
        <NavBarThemeBtn />

        <Button className="rounded-full">
          <AiOutlineSearch />
        </Button>
        {/* authentication links */}
        <NavBarAuth />
      </div>
      {/* navigation links */}
      <div className="hidden md:block">
        <NavBarLinks currentPath={path} />
      </div>
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
