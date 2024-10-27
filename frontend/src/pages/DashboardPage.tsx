import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/dashComponents/DashProfile";
import DashSidebar from "../components/dashComponents/DashSidebar";

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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* sidebar */}
      <div className="">
        <DashSidebar />
      </div>
      {/* profile */}
      {tab === "profile" && <DashProfile />}
    </div>
  );
};

export default DashboardPage;
