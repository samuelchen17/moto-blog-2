import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Avatar } from "flowbite-react";

const DashSidebar = () => {
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
    <div className="w-full md:w-60">
      <div className="flex flex-row gap-2 mx-4 my-4">
        <Avatar rounded />
        <div className="flex flex-col gap">
          <span className="text-lg font-semibold">Username</span>
          <span className="text-sm">User Account</span>
        </div>
      </div>
      <Sidebar className="w-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              as={Link}
              to={"/dashboard?tab=profile"}
              icon={HiUser}
              label={"user"}
              labelColor="dark"
              active={tab === "profile"}
            >
              Profile
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={PiSignOutBold}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default DashSidebar;
