import { IPost } from "src/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import HotPostCard from "./HotPostCard";
import { IGetUser } from "src/types";
import TimeAgo from "../TimeAgo";
import { Link } from "react-router-dom";

const HotPosts = () => {
  const [recentPosts, setRecentPosts] = useState<IPost[] | null>(null);
  const [author, setAuthor] = useState<IGetUser | null>(null);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/gethotposts`);
        const data: IPost[] = await res.json();

        if (res.ok) {
          setRecentPosts(data);
        }

        const authorId = data[0].createdBy;

        if (authorId) {
          const authorRes = await fetch(`/api/${authorId}`);
          const authorData: IGetUser = await authorRes.json();

          if (!authorRes.ok) {
            throw new Error("Failed to fetch author");
          }

          setAuthor(authorData);
        }
      };

      fetchRecentPosts();
    } catch (err) {
      console.error(err);
    }
  }, []);

  if (recentPosts) {
    return (
      <div className="flex w-full gap-4 lg:h-[650px] flex-col lg:flex-row">
        {/* main article */}
        <div className="h-full lg:w-3/5 relative rounded-md overflow-hidden border min-h-[400px]">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt="Post Thumbnail"
            src={recentPosts[0].image}
          />
          <Link to={`/blogs/post/${recentPosts[0].slug}`}>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col justify-start rounded-md p-6 m-6 text-white">
              <span className="lg:text-4xl text-xl font-bold pb-4">
                {recentPosts[0].title}
              </span>
              <span className="mb-4">
                By {author?.username} ·{" "}
                <TimeAgo date={recentPosts[0].createdAt} />
              </span>
              {/* <p
                className="  line-clamp-1"
                dangerouslySetInnerHTML={{ __html: recentPosts[0].content }}
              /> */}

              {/* {recentPosts[0].category} */}
              <Button className="bg-white text-black hover:bg-white/90">
                Read more
              </Button>
            </div>
          </Link>
        </div>

        {/* side articles */}
        <div className="lg:w-2/5 flex-col gap-4 flex">
          {recentPosts &&
            recentPosts.slice(1).map((post) => (
              <div
                key={post._id}
                className="flex lg:h-1/3 h-[220px] overflow-hidden border rounded-md"
              >
                <HotPostCard post={post} />
              </div>
            ))}
        </div>
      </div>
    );
  }
};

export default HotPosts;
