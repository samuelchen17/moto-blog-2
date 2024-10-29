import { useEffect, useState, FC, SVGProps } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { HiUser } from "react-icons/hi";
import { PiSignOutBold } from "react-icons/pi";

interface ISidebarItems {
  name: string;
  path: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  label?: string;
  labelColor?: string;
}

export const sidebarItems: ISidebarItems[] = [
  {
    name: "profile",
    path: "/dashboard?tab=profile",
    icon: HiUser,
    label: "user",
    labelColor: "dark",
  },
  {
    name: "settings",
    path: "/dashboard?tab=settings",
    icon: IoMdSettings,
  },
];

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
      <Sidebar className="w-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {sidebarItems.map((item) => (
              <Sidebar.Item
                key={item.name}
                as={Link}
                to={item.path}
                icon={item.icon}
                // conditionally render properties
                {...(item.label
                  ? { label: item.label, labelColor: item.labelColor }
                  : {})}
                active={tab === item.name}
              >
                <span className="capitalize">{item.name}</span>
              </Sidebar.Item>
            ))}

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
