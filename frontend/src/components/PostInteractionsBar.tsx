import { IPostWithAuthor } from "@/types";
import { Bookmark, MessageSquare, ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

const PostInteractionsBar = ({ post }: { post: IPostWithAuthor }) => {
  return (
    <div className="space-y-4 mb-12">
      <Separator />
      <div className="flex justify-between">
        {/* like comment and saves */}
        <div className="flex gap-6">
          <div className="flex items-center text-center gap-1">
            <ThumbsUp className="w-5 h-5" />
            <span className="text-xs">{post.likes}</span>
          </div>
          <div className="flex items-center text-center gap-1">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">{post.comments}</span>
          </div>
          <div className="flex items-center text-center gap-1">
            <Bookmark className="w-5 h-5" />
            <span className="text-xs">{post.saves}</span>
          </div>
        </div>

        {/* date posted/updated */}
        <div className="font-semibold uppercase">
          {post.createdAt === post.updatedAt ? (
            <div>Posted: {format(new Date(post.createdAt), "dd MMM yyyy")}</div>
          ) : (
            <div>
              Updated: {format(new Date(post.updatedAt), "dd MMM yyyy")}
            </div>
          )}
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default PostInteractionsBar;
