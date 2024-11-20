import { IPost, IPostResponse } from "@shared/types/post";
import { useEffect, useState } from "react";
import RecentPostCard from "./RecentPostCard";

const RecentPosts = () => {
  const [recentPosts, setRecentPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
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

  console.log(recentPosts);

  return (
    <div className="flex flex-col md:flex-row justify-between ">
      {recentPosts &&
        recentPosts.map((post) => (
          <RecentPostCard key={post._id} post={post} />
        ))}
    </div>
  );
};

export default RecentPosts;
