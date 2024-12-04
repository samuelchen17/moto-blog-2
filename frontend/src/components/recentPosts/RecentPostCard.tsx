import { IPost } from "@shared/types/post";
import { IGetUser } from "@shared/types/user";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { FaComment, FaSave, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RecentPostCard = ({ post }: { post: IPost }) => {
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
    <Card>
      <Link to={`/blogs/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="h-[260px] w-full object-cover rounded-t-md border-b"
        />
      </Link>
      <CardHeader>
        <CardDescription className="flex justify-between">
          <div className="flex gap-2 items-center">
            <img
              src={author?.profilePicture}
              className="h-6 w-6 object-cover rounded-full bg-gray-500"
            />
            <span className="font-semibold">{author?.username}</span>
          </div>

          <div className="flex gap-2 items-center ">
            {/* implement */}
            <FaThumbsUp />
            <FaComment />
            <FaSave />
          </div>
        </CardDescription>
        <CardTitle className="capitalize pt-1">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Badge variant="outline" className="uppercase mx-auto">
          {post.category}
        </Badge>
      </CardContent>

      <CardFooter>
        <Button>
          <Link to={`/blogs/post/${post.slug}`}>Read more</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentPostCard;
