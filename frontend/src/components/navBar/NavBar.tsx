// import { Navbar } from "flowbite-react";
import helmetIcon from "/helmet.svg";
import { Link, useLocation } from "react-router-dom";
import NavBarLinks from "./NavBarLinks";
import NavBarAuth from "./NavBarAuth";
import NavBarThemeBtn from "./NavBarThemeBtn";
import { Menu, Search } from "lucide-react";
import SearchBar from "../searchComponent/SearchBar";
import { Button } from "../ui/button";

const NavBar = () => {
  const path = useLocation().pathname;

  return (
    <nav className="flex flex-row justify-between max-w-screen-xl mx-auto h-[80px] items-center px-4 border-b">
      <div className="flex items-center gap-2">
        {/* navbar collapse */}
        {/* <Menu className="md:hidden" size={30} /> */}

        {/* navbar icon */}
        <Link className="flex gap-2" to="/">
          <img src={helmetIcon} className="sm:h-[50px] h-[30px] dark:invert" />
          <span className="self-center whitespace-nowrap text-xl sm:text-4xl font-semibold dark:text-white">
            MOTOCE
          </span>
        </Link>
      </div>

      <div className="flex gap-2 md:order-last">
        <NavBarThemeBtn />

        {/* search component */}
        <Button className="rounded-full">
          <Link to="/search">
            <Search />
          </Link>
        </Button>

        {/* authentication links */}
        <NavBarAuth />
      </div>
      {/* navigation links */}
      {/* <div className="hidden md:block">
        <NavBarLinks currentPath={path} />
        <SearchBar />
      </div> */}
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
