import { IPost, IPostResponse } from "@shared/types/post";
import { useEffect, useState } from "react";
import RecentPostCard from "./RecentPostCard";

const RecentPosts = ({ limit }: { limit: number }) => {
  const [recentPosts, setRecentPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=${limit}`);
        const data: IPostResponse = await res.json();

        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };

      fetchRecentPosts();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
      {recentPosts &&
        recentPosts.map((post) => (
          <RecentPostCard key={post._id} post={post} />
        ))}
    </div>
  );
};

export default RecentPosts;
