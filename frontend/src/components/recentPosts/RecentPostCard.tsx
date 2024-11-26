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
    <Card className="m-2">
      <Link to={`/blogs/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="h-[260px] w-full object-cover rounded-t-md"
        />
      </Link>
      <CardHeader>
        <CardDescription className="flex justify-between">
          <div className="flex gap-2">
            <img
              src={author?.profilePicture}
              className="h-5 w-5 object-cover rounded-full bg-blue-500"
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
        <CardTitle className="capitalize">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge className="uppercase mx-auto">{post.category}</Badge>
      </CardContent>

      <CardFooter>
        <Button variant="outline">
          <Link to={`/blogs/post/${post.slug}`}>Read more</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentPostCard;
