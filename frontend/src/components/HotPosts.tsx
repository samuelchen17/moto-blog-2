import { IPost, IPostResponse } from "@shared/types/post";
import { useEffect, useState } from "react";

const HotPosts = ({ limit }: { limit: number }) => {
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

  if (recentPosts) {
    return (
      <div className="flex w-full gap-4 h-[500px]">
        <div className="h-full w-3/5 outline">
          <img className="object-cover h-full" src={recentPosts[0].image} />
        </div>
        <div className="w-2/5 h-full">
          {recentPosts &&
            recentPosts.slice(1).map((post) => (
              <div key={post._id} className="flex">
                <img src={post.image} className="object-cover" />
                <span>post</span>
              </div>
            ))}
        </div>
      </div>
    );
  }
};

export default HotPosts;
