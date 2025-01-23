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

          {/* User events tab */}
          {tab === "joined-events" && <DashEventsUser />}

          {/* User saved post tab */}
          {tab === "saved-posts" && <DashSaved />}

          {/* {tab === "liked-posts" && <DashEventsUser />} */}
        </div>
      </div>
    </div>
    // </SidebarProvider>
  );
};

export default DashboardPage;
