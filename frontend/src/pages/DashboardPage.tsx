import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/dashComponents/DashProfile";
import DashSettings from "../components/dashComponents/DashSettings";
import Dashboard from "../components/dashComponents/dashAdminComponents/Dashboard";
import DashComments from "../components/dashComponents/dashAdminComponents/DashComments";
import DashPosts from "../components/dashComponents/dashAdminComponents/DashPosts";
import DashUsers from "../components/dashComponents/dashAdminComponents/DashUsers";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DashNavSidebar from "@/components/dashComponents/dashNav/dashNavSidebar";
import { Separator } from "@/components/ui/separator";

const DashboardPage = () => {
  const location = useLocation();
  const [tab, setTab] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <SidebarProvider defaultOpen={true}>
      <DashNavSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div>Profile</div>
          </div>
        </header>

        {/* content */}
        {/* dashboard */}
        <div className="w-full max-w-screen-xl mx-auto">
          {tab === "dashboard" && <Dashboard />}

          {/* profile */}
          {tab === "profile" && <DashProfile />}

          {/* settings */}
          {tab === "settings" && <DashSettings />}

          {/* comments */}
          {tab === "comments" && <DashComments />}

          {/* posts */}
          {tab === "posts" && <DashPosts />}

          {/* users */}
          {tab === "users" && <DashUsers />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage;

// import DashNavSidebar from "@/components/dashComponents/dashNav/dashNavSidebar";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";

// const BlogsPage = () => {
//   return (
//     <SidebarProvider defaultOpen={true}>
//       <DashNavSidebar />
//       <SidebarInset>
//         <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
//           <div className="flex items-center gap-2 px-4">
//             <SidebarTrigger className="-ml-1" />
//             <Separator orientation="vertical" className="mr-2 h-4" />
//             <div>Profile</div>
//           </div>
//         </header>

//         {/* content */}
//       {/* dashboard */}
//       <div className="w-full max-w-screen-xl mx-auto">
//           {tab === "dashboard" && <Dashboard />}

//           {/* profile */}
//           {tab === "profile" && <DashProfile />}

//           {/* settings */}
//           {tab === "settings" && <DashSettings />}

//           {/* comments */}
//           {tab === "comments" && <DashComments />}

//           {/* posts */}
//           {tab === "posts" && <DashPosts />}

//           {/* users */}
//           {tab === "users" && <DashUsers />}
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// };

// export default BlogsPage;
