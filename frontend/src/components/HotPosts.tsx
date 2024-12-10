import { IPost, IPostResponse } from "@shared/types/post";
import { useEffect, useState } from "react";
import RecentPostCard from "./recentPosts/RecentPostCard";
import { Card } from "./ui/card";

const HotPosts = ({ limit }: { limit: number }) => {
  const [recentPosts, setRecentPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=${3}`);
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
    <div className="flex w-full">
      <Card>Post 1</Card>
      <div className="w-2/5">
        {recentPosts &&
          recentPosts.map((post) => (
            <div
              className="lg:basis-1/4 md:basis-1/3 sm:basis-1/2"
              key={post._id}
            >
              <RecentPostCard post={post} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HotPosts;
