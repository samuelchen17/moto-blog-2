import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { navLinks } from "../../config/navLinks.config";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

// const NavBarLinks: React.FC<INavBarLinksProps> = ({ currentPath }) => {
const NavBarLinks = ({ currentPath }: { currentPath: string }) => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  return (
    <div>
      {navLinks.map((link) => (
        <Link
          className="capitalize"
          key={link.path}
          to={link.path}
          // active={currentPath === link.path}
        >
          {link.name}
        </Link>
      ))}
      {/* {currentUser?.user.admin && (
        <Navbar.Link
          className="capitalize"
          as={Link}
          to="/dashboard/?tab=dashboard"
          active={currentPath === "/dashboard/?tab=dashboard"}
        >
          dashboard
        </Navbar.Link>
      )} */}
    </div>
  );
};

export default NavBarLinks;
