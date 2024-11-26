import RecentPosts from "../components/recentPosts/RecentPosts";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl uppercase font-bold items-center justify-center flex underline">
        Recent Posts
      </h1>
      <RecentPosts limit={6} />
    </div>
  );
};

export default HomePage;
