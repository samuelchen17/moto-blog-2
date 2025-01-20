import { IPostWithAuthor } from "src/types";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import TimeAgo from "../TimeAgo";
import { _get } from "@/api/axiosClient";
import LikeCommentSaveCounter from "../LikeCommentSaveCounter";

const HotPostCard = ({ post }: { post: IPostWithAuthor }) => {
  return (
    <>
      <Link
        to={`/blogs/post/${post.slug}`}
        className="object-cover h-full w-1/2 relative"
      >
        <img
          src={post.image}
          className="object-cover h-full w-full object-center"
          alt="Post Thumbnail"
        />
        <LikeCommentSaveCounter post={post} />
      </Link>

      {/* card information */}
      <div className="w-1/2 p-4 flex flex-col justify-between">
        <div>
          <span className="line-clamp-2 font-semibold md:text-lg">
            {post.title}
          </span>
          <div className="text-gray-500 text-sm">
            By {post?.createdBy.username} · <TimeAgo date={post.createdAt} />
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Badge variant="outline" className="uppercase">
            {post.category}
          </Badge>
          <Button>
            <Link to={`/blogs/post/${post.slug}`}>Read more</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default HotPostCard;
