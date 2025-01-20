import { useSearchParams } from "react-router-dom";
import DashProfile from "../components/dashComponents/dashUser/DashProfile";
import DashSidebar from "../components/dashComponents/DashSidebar";
import DashHeader from "../components/dashComponents/dashUser/DashHeader";
import DashSettings from "../components/dashComponents/dashUser/DashSettings";
import Dashboard from "../components/dashComponents/dashAdminComponents/Dashboard";
import DashComments from "../components/dashComponents/dashAdminComponents/DashComments";
import DashPosts from "../components/dashComponents/dashAdminComponents/DashPosts";
import DashUsers from "../components/dashComponents/dashAdminComponents/DashUsers";
import DashEvents from "../components/dashComponents/dashAdminComponents/DashEvents";
import PostFormPage from "./PostFormPage";

const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  // check to see if the tab has a post id
  const match = tab?.match(/^update-post\/(.+)$/);
  const postId = match ? match[1] : null;

  return (
    // <SidebarProvider className="flex flex-col">
    <div className="max-w-screen-xl mx-auto ">
      <DashHeader />

      <div className="min-h-screen flex flex-col md:flex-row mb-12">
        {/* sidebar */}
        <DashSidebar />

        {/* dashboard */}
        <div className="w-full max-w-screen-xl mx-auto mt-4 px-8">
          {/* dynamically  display page title*/}
          <h2 className="text-2xl mb-6 capitalize space-y-2">
            <span>{tab}</span>
            <hr />
          </h2>

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
    </div>
    // </SidebarProvider>
  );
};

export default DashboardPage;
