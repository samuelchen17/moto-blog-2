import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import userSignOut from "../../utils/userSignOut.utils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  dashUserNavItems,
  dashAdminNavItems,
} from "../../config/dashNavItems.config";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState<string>("");
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const { notificationsCount } = useAppSelector(
    (state: RootState) => state.contactNotification
  );

  const { theme } = useAppSelector((state: RootState) => state.persisted.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="w-full md:max-w-60">
      <Sidebar className="w-full">
        <Sidebar.Items>
          {/* User group */}
          <Sidebar.ItemGroup>
            {dashUserNavItems
              // .filter((item) => !item.admin || currentUser?.user.admin)
              .map((item) => (
                <Sidebar.Item
                  key={item.name}
                  as={Link}
                  to={item.path}
                  icon={item.icon}
                  // conditionally render properties
                  {...(item.label && {
                    label: currentUser?.user.admin ? "Admin" : "User",
                    labelColor: theme,
                  })}
                  active={tab === item.name}
                >
                  <span className="capitalize">{item.name}</span>
                </Sidebar.Item>
              ))}
          </Sidebar.ItemGroup>

          {/* Admin group */}
          {currentUser?.user.admin && (
            <Sidebar.ItemGroup>
              {dashAdminNavItems.map((item) => (
                <Sidebar.Item
                  key={item.name}
                  as={Link}
                  to={item.path}
                  icon={item.icon}
                  active={tab === item.name}
                  // {...(notificationsCount > 0 &&
                  //   item.label && {
                  //     label: notificationsCount,
                  //     labelColor: "bg-red-600 text-white",
                  //   })}
                >
                  <span className="capitalize">{item.name}</span>
                  {notificationsCount > 0 && item.label && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-red-600 rounded-md">
                      {notificationsCount}
                    </span>
                  )}
                </Sidebar.Item>
              ))}
            </Sidebar.ItemGroup>
          )}

          {/* sign out button */}
          <Sidebar.ItemGroup>
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
