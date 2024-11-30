import RecentPosts from "../components/recentPosts/RecentPosts";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-6 my-20 mx-6">
      <h1 className="text-3xl uppercase font-bold items-center justify-center flex underline">
        Latest Posts
      </h1>
      <div className="max-w-screen-lg mx-auto">
        {/* make recent posts a carousel? implement */}
        <RecentPosts limit={6} />
      </div>

      <div>
        <h2>Group ride</h2>
        <p>add group ride stuff here</p>
      </div>
    </div>
  );
};

export default HomePage;
