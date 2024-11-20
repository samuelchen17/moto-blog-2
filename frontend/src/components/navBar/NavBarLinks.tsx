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
    <Navbar.Collapse>
      {navLinks.map((link) => (
        <Navbar.Link
          className="capitalize"
          key={link.path}
          as={Link}
          to={link.path}
          active={currentPath === link.path}
        >
          {link.name}
        </Navbar.Link>
      ))}
      {currentUser?.user.admin && (
        <Navbar.Link
          className="capitalize"
          as={Link}
          to="/dashboard/?tab=dashboard"
          active={currentPath === "/dashboard/?tab=dashboard"}
        >
          dashboard
        </Navbar.Link>
      )}
    </Navbar.Collapse>
  );
};

export default NavBarLinks;
