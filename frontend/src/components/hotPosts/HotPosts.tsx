import { IPostWithAuthor } from "src/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import HotPostCard from "./HotPostCard";
import TimeAgo from "../TimeAgo";
import { Link } from "react-router-dom";

import { _get } from "@/api/axiosClient";
import {
  SkeletonHotPostMain,
  SkeletonHotPostSide,
} from "../SkeletonComponents";

const HotPosts = () => {
  const [hotPosts, setHotPosts] = useState<IPostWithAuthor[] | null>(null);

  useEffect(() => {
    try {
      const fetchHotPosts = async () => {
        // for testing
        // await new Promise((resolve) => setTimeout(resolve, 5000));

        const res = await _get<IPostWithAuthor[]>(`/post/gethotposts`);
        const data = res.data;

        setHotPosts(data);
      };

      fetchHotPosts();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="flex w-full gap-4 lg:h-[650px] flex-col lg:flex-row">
      {/* main article */}
      <div className="h-full lg:w-3/5 relative rounded-md overflow-hidden border min-h-[400px]">
        {hotPosts ? (
          <>
            <img
              className="absolute top-0 left-0 w-full h-full object-cover"
              alt="Post Thumbnail"
              src={hotPosts[0].image}
            />
            <Link to={`/blogs/post/${hotPosts[0].slug}`}>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col justify-start rounded-md p-6 m-6 text-white">
                <span className="lg:text-4xl text-xl font-bold pb-4">
                  {hotPosts[0].title}
                </span>
                <span className="mb-4">
                  By {hotPosts[0]?.createdBy.username} ·{" "}
                  <TimeAgo date={hotPosts[0].createdAt} />
                  {/* By {hotPosts[0].author.username} ·{" "}
                <TimeAgo date={hotPosts[0].createdAt} /> */}
                </span>
                {/* <p
                className="  line-clamp-1"
                dangerouslySetInnerHTML={{ __html: hotPosts[0].content }}
              /> */}

                {/* {hotPosts[0].category} */}
                <Button className="bg-white text-black hover:bg-white/90">
                  Read more
                </Button>
              </div>
            </Link>
          </>
        ) : (
          <SkeletonHotPostMain />
        )}
      </div>

      {/* side articles */}
      <div className="lg:w-2/5 flex-col gap-4 flex">
        {hotPosts ? (
          hotPosts &&
          hotPosts.slice(1).map((post) => (
            <div
              key={post._id}
              className="flex lg:h-1/3 h-[220px] overflow-hidden border rounded-md"
            >
              <HotPostCard post={post} />
            </div>
          ))
        ) : (
          <SkeletonHotPostSide />
        )}
      </div>
    </div>
  );
};

export default HotPosts;
