import { IPost } from "src/types";
import { IGetUser } from "src/types";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import {
  Card,
  // CardContent,
  CardDescription,
  // CardFooter,
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
    <Card className="min-h-[430px]">
      <Link to={`/blogs/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="h-[160px] w-full object-cover rounded-t-md border-b"
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
            {/* <FaThumbsUp />
            <FaComment />
            <FaSave /> */}
            {format(new Date(post.createdAt), "dd MMM yyyy")}
          </div>
        </CardDescription>
        <CardTitle className="capitalize pt-3">{post.title}</CardTitle>
      </CardHeader>
      {/* <CardContent className=""></CardContent> */}
      <div className="absolute bottom-0 ml-5 mb-5 flex flex-col gap-4">
        <Badge variant="outline" className="uppercase mr-auto">
          {post.category}
        </Badge>
        {/* <CardFooter className="outline"> */}
        <Button>
          <Link to={`/blogs/post/${post.slug}`}>Read more</Link>
        </Button>
        {/* </CardFooter> */}
      </div>
    </Card>
  );
};

export default RecentPostCard;
