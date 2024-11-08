import { FC, SVGProps } from "react";
import { MdOutlinePostAdd, MdSpaceDashboard } from "react-icons/md";
import { BiSolidCommentDetail } from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { HiUser } from "react-icons/hi";
import { PiUsersFourFill } from "react-icons/pi";

interface IDashNavItems {
  name: string;
  path: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  label?: boolean;
  labelColor?: string;
  admin?: boolean;
}

export const dashNavItems: IDashNavItems[] = [
  {
    name: "Dashboard",
    path: "/dash",
    icon: MdSpaceDashboard,
    admin: true,
  },
  {
    name: "profile",
    path: "/dashboard?tab=profile",
    icon: HiUser,
    label: true,
    labelColor: "dark",
  },
  {
    name: "settings",
    path: "/dashboard?tab=settings",
    icon: IoMdSettings,
  },
  {
    name: "Comments",
    path: "/comments",
    icon: BiSolidCommentDetail,
    admin: true,
  },
  {
    name: "Users",
    path: "/users",
    icon: PiUsersFourFill,
    admin: true,
  },
  {
    name: "Write",
    path: "/create-post",
    icon: MdOutlinePostAdd,
    admin: true,
  },
  {
    name: "Posts",
    path: "/posts",
    icon: HiDocumentText,
    admin: true,
  },
];
