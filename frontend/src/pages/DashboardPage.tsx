import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
    <SidebarProvider className="flex flex-col">
      <DashHeader />

      <div className="min-h-screen flex flex-col md:flex-row">
        {/* sidebar */}
        <DashSidebar />

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

          {/* add events */}
          {tab === "events" && <DashEvents />}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;
