import { IPost } from "@shared/types/post";
import { IGetUser } from "@shared/types/user";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import TimeAgo from "../TimeAgo";

const HotPostCard = ({ post }: { post: IPost }) => {
  const [author, setAuthor] = useState<IGetUser | null>(null);

  useEffect(() => {
    try {
      const fetchAuthor = async () => {
        const res = await fetch(`/api/${post.createdBy}`);

        const data: IGetUser = await res.json();

        if (res.ok) {
          setAuthor(data);
        }
      };

      fetchAuthor();
    } catch (err) {
      console.error(err);
    }
  }, [post]);

  return (
    <>
      <Link
        to={`/blogs/post/${post.slug}`}
        className="object-cover h-full w-1/2"
      >
        <img
          src={post.image}
          className="object-cover h-full w-full object-center"
          alt="Post Thumbnail"
        />
      </Link>

      {/* card information */}
      <div className="w-1/2 p-4 flex flex-col justify-between">
        <div>
          <span className="line-clamp-2 font-semibold md:text-lg">
            {post.title}
          </span>
          <div className="text-gray-500 text-sm">
            By {author?.username} · <TimeAgo date={post.createdAt} />
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
