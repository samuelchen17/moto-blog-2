import { NavbarLink, NavbarCollapse } from "flowbite-react";

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
    path: "/dashboard",
  },
  {
    name: "ABOUT",
    path: "/dashboard",
  },
  {
    name: "DASH",
    path: "/dashboard",
  },
];

const NavBarLinks: React.FC<INavBarLinksProps> = ({ currentPath }) => {
  return (
    <NavbarCollapse>
      {navLinks.map((link) => {
        <NavbarLink
          key={link.path}
          as={Link}
          to={link.path}
          active={currentPath === "/dashboard"}
        >
          DASH
        </NavbarLink>;
      })}
    </NavbarCollapse>
  );
};

export default NavBarLinks;
