import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

interface INavLinks {
  name: string;
  path: string;
}

const navLinks: INavLinks[] = [
  {
    name: "home",
    path: "/home",
  },
  {
    name: "blogs",
    path: "/blogs",
  },
  {
    name: "about",
    path: "/about",
  },
  {
    name: "dash",
    path: "/dashboard",
  },
];

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
