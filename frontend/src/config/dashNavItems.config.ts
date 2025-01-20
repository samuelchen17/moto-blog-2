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
  Bookmark,
  CalendarCog,
  ThumbsUp,
} from "lucide-react";

interface IDashNavItems {
  name: string;
  path: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  label?: boolean;
  labelColor?: string;
  admin?: boolean;
}

export const dashUserNavItems: IDashNavItems[] = [
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
    name: "saved",
    path: "/dashboard?tab=saved-posts",
    icon: Bookmark,
  },
  {
    name: "Liked",
    path: "/dashboard?tab=liked-posts",
    icon: ThumbsUp,
  },
  {
    name: "Events",
    path: "/dashboard?tab=joined-events",
    icon: Calendar,
  },
];

export const dashAdminNavItems: IDashNavItems[] = [
  {
    name: "dashboard",
    path: "/dashboard/?tab=dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "comments",
    path: "/dashboard/?tab=comments",
    icon: MessageSquareText,
  },
  {
    name: "users",
    path: "/dashboard/?tab=users",
    icon: Users,
  },
  {
    name: "events",
    path: "/dashboard/?tab=events",
    icon: CalendarCog,
  },
  {
    name: "posts",
    path: "/dashboard/?tab=posts",
    icon: FileText,
  },
  {
    name: "write",
    path: "/dashboard/?tab=create-post",
    icon: NotebookPen,
  },
];
