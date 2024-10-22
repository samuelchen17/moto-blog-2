import { NavbarLink, NavbarCollapse } from "flowbite-react";
import { Link } from "react-router-dom";

interface INavBarLinksProps {
  currentPath: string;
}

interface INavLinks {
  name: string;
  path: string;
}

const navLinks: INavLinks[] = [
  {
    name: "HOME",
    path: "/home",
  },
  {
    name: "BLOGS",
    path: "/blogs",
  },
  {
    name: "ABOUT",
    path: "/about",
  },
  {
    name: "DASH",
    path: "/dashboard",
  },
];

const NavBarLinks: React.FC<INavBarLinksProps> = ({ currentPath }) => {
  return (
    <NavbarCollapse>
      {navLinks.map((link) => (
        <NavbarLink
          key={link.path}
          as={Link}
          to={link.path}
          active={currentPath === link.path}
        >
          {link.name}
        </NavbarLink>
      ))}
    </NavbarCollapse>
  );
};

export default NavBarLinks;
