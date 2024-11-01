import { useEffect, useState, FC, SVGProps } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { HiUser } from "react-icons/hi";
import { PiSignOutBold } from "react-icons/pi";
import userSignOut from "../../utils/userSignOut.utils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

interface ISidebarItems {
  name: string;
  path: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  label?: boolean;
  labelColor?: string;
}

export const sidebarItems: ISidebarItems[] = [
  {
    name: "profile",
    path: "/dashboard?tab=profile",
    icon: HiUser,
    label: true,
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
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

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
                  ? {
                      label: currentUser?.user.admin ? "Admin" : "User",
                      labelColor: item.labelColor,
                    }
                  : {})}
                active={tab === item.name}
              >
                <span className="capitalize">{item.name}</span>
              </Sidebar.Item>
            ))}

            <Sidebar.Item
              href="#"
              icon={PiSignOutBold}
              onClick={() => userSignOut({ dispatch })}
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default DashSidebar;
