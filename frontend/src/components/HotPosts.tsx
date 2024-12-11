import { IPost, IPostResponse } from "@shared/types/post";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

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
      <div className="flex w-full gap-4 lg:h-[600px] flex-col lg:flex-row">
        {/* main article */}
        <div className="h-full lg:w-3/5 relative rounded-md overflow-hidden border min-h-[400px]">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt="Post Thumbnail"
            src={recentPosts[0].image}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col justify-start rounded-md p-6 m-6 text-white">
            <span className="lg:text-4xl text-xl font-bold pb-4">
              {recentPosts[0].title}
            </span>
            <span>By {recentPosts[0].createdBy}</span>
            <div>button for read more</div>
            <Button className="bg-white text-black">Read more</Button>
          </div>
        </div>

        {/* side articles */}
        <div className="lg:w-2/5 lg:flex-col gap-4 hidden lg:flex">
          {recentPosts &&
            recentPosts.slice(1).map((post) => (
              <div
                key={post._id}
                className="flex h-1/3 overflow-hidden border rounded-md"
              >
                <img
                  src={post.image}
                  className="object-cover h-full w-1/2 object-center"
                  alt="Post Thumbnail"
                />
                <div className="w-1/2">These are the authors words</div>
              </div>
            ))}
        </div>
      </div>
    );
  }
};

export default HotPosts;
