import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { navLinks } from "../../config/navLinks.config";

// const NavBarLinks: React.FC<INavBarLinksProps> = ({ currentPath }) => {
const NavBarLinks = ({ currentPath }: { currentPath: string }) => {
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
    </Navbar.Collapse>
  );
};

export default NavBarLinks;
