import { useSearchParams } from "react-router-dom";
import DashProfile from "../components/dash/dashUser/DashProfile";
import DashSidebar from "../components/dash/DashSidebar";
import DashHeader from "../components/dash/dashUser/DashHeader";
import DashSettings from "../components/dash/dashUser/DashSettings";
import Dashboard from "../components/dash/dashAdmin/Dashboard";
import DashComments from "../components/dash/dashAdmin/DashComments";
import DashPosts from "../components/dash/dashAdmin/DashPosts";
import DashUsers from "../components/dash/dashAdmin/DashUsers";
import DashEvents from "../components/dash/dashAdmin/DashEvents";
import PostFormPage from "./PostFormPage";
import DashEventsUser from "@/components/dash/dashUser/DashEventsUser";
import DashSaved from "@/components/dash/dashUser/DashSaved";
import DashMessages from "@/components/dash/dashAdmin/DashMessages";
import DashCommentsUser from "@/components/dash/dashUser/DashCommentsUser";

const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  // check to see if the tab has a post id
  const match = tab?.match(/^update-post\/(.+)$/);
  const postId = match ? match[1] : null;

  return (
    // <SidebarProvider className="flex flex-col">
    <div className="max-w-screen-xl mx-auto">
      <DashHeader />

      <div className="min-h-screen flex flex-col md:flex-row mb-12">
        {/* sidebar */}
        <DashSidebar />

        {/* dashboard */}
        <div className="w-full max-w-screen-xl mx-auto mt-4 md:px-8 px-4">
          {/* dynamically  display page title*/}
          <h2 className="text-2xl mb-6 capitalize space-y-2">
            <span>{tab}</span>
            <hr />
          </h2>

          {tab === "dashboard" && <Dashboard />}

          {/* user routes*/}
          {tab === "profile" && <DashProfile />}
          {tab === "settings" && <DashSettings />}
          {tab === "saved-posts" && <DashSaved />}
          {tab === "user-comments" && <DashCommentsUser />}
          {tab === "joined-events" && <DashEventsUser />}
          {/* {tab === "liked-posts" && <DashEventsUser />} */}

          {/* admin */}
          {tab === "comments" && <DashComments />}
          {tab === "posts" && <DashPosts />}
          {tab === "users" && <DashUsers />}
          {tab === "events" && <DashEvents />}
          {tab === "create-post" && <PostFormPage key="create" />}
          {postId && <PostFormPage key="update" postId={postId} />}
          {tab === "admin-messages" && <DashMessages />}
        </div>
      </div>
    </div>
    // </SidebarProvider>
  );
};

export default DashboardPage;
