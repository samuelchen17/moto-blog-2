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
    <div>
      <DashHeader />

      <div className="min-h-screen flex flex-col md:flex-row">
        {/* sidebar */}

        <DashSidebar />
        {/* dashboard */}
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
    </div>
  );
};

export default DashboardPage;
