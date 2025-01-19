import { IPostWithAuthor } from "src/types";
import { Button } from "../ui/button";
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
import { _get } from "@/api/axiosClient";
import { Bookmark, MessageSquare, ThumbsUp } from "lucide-react";

const RecentPostCard = ({ post }: { post: IPostWithAuthor }) => {
  return (
    <Card className="min-h-[430px]">
      <Link className="relative" to={`/blogs/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="h-[160px] w-full object-cover rounded-t-md border-b"
        />
        <div className="absolute rounded-tl-md rounded-br-md left-0 top-0 bg-black opacity-75 text-white p-2 flex gap-2">
          <div className="flex items-center text-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-xs">50</span>
          </div>
          <div className="flex items-center text-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs">50</span>
          </div>
          <div className="flex items-center text-center gap-1">
            <Bookmark className="w-4 h-4" />
            <span className="text-xs">50</span>
          </div>
        </div>
      </Link>
      <CardHeader>
        <CardDescription className="flex justify-between">
          {/* author */}
          <div className="flex gap-2 items-center">
            <img
              src={post?.createdBy.profilePicture}
              className="h-6 w-6 object-cover rounded-full bg-gray-500"
            />
            <span className="font-semibold">{post?.createdBy.username}</span>
          </div>

          {/* date */}
          <div className="flex gap-2 items-center ">
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
