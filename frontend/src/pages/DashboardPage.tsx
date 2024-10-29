import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/dashComponents/DashProfile";
import DashSidebar from "../components/dashComponents/DashSidebar";
import DashHeader from "../components/dashComponents/DashHeader";
import DashSettings from "../components/dashComponents/DashSettings";

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

        {/* profile */}
        {tab === "profile" && <DashProfile />}

        {/* settings */}
        {tab === "settings" && <DashSettings />}
      </div>
    </div>
  );
};

export default DashboardPage;
