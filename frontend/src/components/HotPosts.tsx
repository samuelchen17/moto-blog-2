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
      <div className="flex w-full gap-4 h-[600px]">
        {/* main article */}
        <div className="h-full w-3/5 relative rounded-md overflow-hidden border">
          <img
            className="object-cover h-full w-full"
            src={recentPosts[0].image}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col justify-start rounded-md p-6 m-6 text-white">
            <div>
              Read more here fasdlk jfdlksajf lksdaj flksdja kljaslk jflk
              ljfaslkj l;fkasjd lkjfaslk jfl;kasj kljafsd;lk fjlk;asj
              flkaj;lfjasl;k jfiolawej ilfjasi lfjaskldj fiaej
            </div>
            <div>button for read more</div>
          </div>
        </div>
        <div className="w-2/5 flex flex-col gap-4">
          {recentPosts &&
            recentPosts.slice(1).map((post) => (
              <div
                key={post._id}
                className="flex h-1/3 overflow-hidden border rounded-md"
              >
                <img src={post.image} className="object-cover w-1/2" />
                <div className="w-1/2">These are the authors words</div>
              </div>
            ))}
        </div>
      </div>
    );
  }
};

export default HotPosts;
