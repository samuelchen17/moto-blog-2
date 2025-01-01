import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import DashProfile from "../components/dashComponents/DashProfile";
import DashSidebar from "../components/dashComponents/DashSidebar";
import DashHeader from "../components/dashComponents/DashHeader";
import DashSettings from "../components/dashComponents/DashSettings";
import Dashboard from "../components/dashComponents/dashAdminComponents/Dashboard";
import DashComments from "../components/dashComponents/dashAdminComponents/DashComments";
import DashPosts from "../components/dashComponents/dashAdminComponents/DashPosts";
import DashUsers from "../components/dashComponents/dashAdminComponents/DashUsers";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashEvents from "../components/dashComponents/dashAdminComponents/DashEvents";
import PostFormPage from "./PostFormPage";

const DashboardPage = () => {
  // const location = useLocation();
  // const [tab, setTab] = useState<string>("");

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const tabFromUrl = urlParams.get("tab");
  //   if (tabFromUrl) {
  //     setTab(tabFromUrl);
  //   }
  // }, [location.search]);

  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  // check to see if the tab has a post id
  const match = tab?.match(/^update-post\/(.+)$/);
  const postId = match ? match[1] : null;

  return (
    <SidebarProvider className="flex flex-col">
      <DashHeader />

      <div className="min-h-screen flex flex-col md:flex-row">
        {/* sidebar */}
        <DashSidebar />

        {/* dashboard */}
        <div className="w-full max-w-screen-xl mx-auto mt-4 px-4">
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

          {/* add events */}
          {tab === "events" && <DashEvents />}

          {/* write post */}
          {tab === "create-post" && <PostFormPage key="create" />}

          {/* edit post */}
          {postId && <PostFormPage key="update" postId={postId} />}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;
