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
import LikeCommentSaveCounter from "../LikeCommentSaveCounter";
import { Badge } from "../ui/badge";
import ProfileLinkWrapper from "../ProfileLinkWrapper";

const HotPosts = () => {
  const [hotPosts, setHotPosts] = useState<IPostWithAuthor[] | null>(null);

  useEffect(() => {
    try {
      const fetchHotPosts = async () => {
        // remove production
        // await new Promise((resolve) => setTimeout(resolve, 100000));

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
            <LikeCommentSaveCounter post={hotPosts[0]} />

            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 flex flex-col justify-start rounded-md p-6 m-6 text-white space-y-4">
              {/* post title */}
              <span className="lg:text-4xl text-xl font-bold">
                {hotPosts[0].title}
              </span>

              {/* author information */}

              <span className="flex gap-2">
                By{" "}
                <ProfileLinkWrapper userId={hotPosts[0].createdBy._id}>
                  <div className="flex gap-2">
                    <img
                      src={hotPosts[0].createdBy.profilePicture}
                      className="h-6 w-6 object-cover rounded-full bg-gray-500 border"
                    />
                    <span className="hover:underline">
                      {hotPosts[0]?.createdBy.username}
                    </span>{" "}
                  </div>
                </ProfileLinkWrapper>{" "}
                · <TimeAgo date={hotPosts[0].createdAt} />
              </span>

              {/* blog content */}
              <p
                className="  line-clamp-2"
                dangerouslySetInnerHTML={{ __html: hotPosts[0].content }}
              />

              {/* category */}
              <Badge className="uppercase mr-auto bg-white text-black hover:bg-white">
                {hotPosts[0].category}
              </Badge>
              <Link to={`/blogs/post/${hotPosts[0].slug}`}>
                <Button className="bg-white text-black hover:bg-white/90 w-full">
                  Read more
                </Button>
              </Link>
            </div>
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
