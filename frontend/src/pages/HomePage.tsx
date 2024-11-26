import RecentPosts from "../components/recentPosts/RecentPosts";

const HomePage = () => {
  return (
    <div>
      <RecentPosts limit={6} />
    </div>
  );
};

export default HomePage;
