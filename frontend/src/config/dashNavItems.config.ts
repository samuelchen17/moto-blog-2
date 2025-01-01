import { FC, SVGProps } from "react";

import {
  LayoutDashboard,
  User,
  Settings,
  MessageSquareText,
  Users,
  FileText,
  NotebookPen,
  Calendar,
} from "lucide-react";

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
    name: "dashboard",
    path: "/dashboard/?tab=dashboard",
    icon: LayoutDashboard,
    admin: true,
  },
  {
    name: "profile",
    path: "/dashboard?tab=profile",
    icon: User,
    label: true,
    labelColor: "dark",
  },
  {
    name: "settings",
    path: "/dashboard?tab=settings",
    icon: Settings,
  },
  {
    name: "comments",
    path: "/dashboard/?tab=comments",
    icon: MessageSquareText,
    admin: true,
  },
  {
    name: "users",
    path: "/dashboard/?tab=users",
    icon: Users,
    admin: true,
  },
  {
    name: "events",
    path: "/dashboard/?tab=events",
    icon: Calendar,
    admin: true,
  },
  {
    name: "posts",
    path: "/dashboard/?tab=posts",
    icon: FileText,
    admin: true,
  },
  {
    name: "write",
    path: "/dashboard/?tab=create-post",
    icon: NotebookPen,
    admin: true,
  },
];
