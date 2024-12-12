import { IPost } from "@shared/types/post";
import { IGetUser } from "@shared/types/user";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

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
      <img
        src={post.image}
        className="object-cover h-full w-1/2 object-center"
        alt="Post Thumbnail"
      />

      {/* card information */}
      <div className="w-1/2 p-4 flex flex-col justify-between">
        <div>
          <span className="line-clamp-2 font-semibold text-lg">
            {post.title}
          </span>
          <div className="text-slate-600 text-sm">
            By {author?.username} ·{" "}
            {format(new Date(post.createdAt), "dd/MM/yyyy")}
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Badge variant="outline" className="uppercase">
            {post.category}
          </Badge>
          <Button>Read more</Button>
        </div>
      </div>
    </>
  );
};

export default HotPostCard;
