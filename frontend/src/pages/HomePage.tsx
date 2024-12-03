import RecentPosts from "../components/recentPosts/RecentPosts";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-6 my-20 px-6 max-w-screen-lg mx-auto">
      <div className="flex flex-col justify-center py-24">
        <h2 className="font-bold text-2xl mb-6">You might also like</h2>
        <RecentPosts limit={9} />
      </div>

      <div>
        <h2>Group ride</h2>
        <p>add group ride stuff here</p>
      </div>
    </div>
  );
};

export default HomePage;
