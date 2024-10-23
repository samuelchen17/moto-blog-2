import { NavbarLink, NavbarCollapse } from "flowbite-react";
import { Link } from "react-router-dom";

// interface INavBarLinksProps {
//   currentPath: string;
// }

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
    <NavbarCollapse>
      {navLinks.map((link) => (
        <NavbarLink
          className="capitalize"
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
