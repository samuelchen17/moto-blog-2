import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import DashNavUser from "./DashNavUser";

const DashNavSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader>
        <DashNavUser />
      </SidebarHeader>
      <SidebarContent>
        <div>settings</div>
        <div>profile</div>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default DashNavSidebar;
