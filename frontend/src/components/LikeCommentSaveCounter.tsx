import { IPostWithAuthor } from "@/types";
import { Bookmark, MessageSquare, ThumbsUp } from "lucide-react";

const LikeCommentSaveCounter = ({ post }: { post: IPostWithAuthor }) => {
  return (
    <div className="absolute border border-black rounded-r-md left-0 top-3 bg-black opacity-75 text-white p-2 flex gap-2">
      <div className="flex items-center text-center gap-1">
        <ThumbsUp className="w-4 h-4" />
        <span className="text-xs">{post.likes}</span>
      </div>
      <div className="flex items-center text-center gap-1">
        <MessageSquare className="w-4 h-4" />
        <span className="text-xs">{post.comments}</span>
      </div>
      <div className="flex items-center text-center gap-1">
        <Bookmark className="w-4 h-4" />
        <span className="text-xs">{post.saves}</span>
      </div>
    </div>
  );
};

export default LikeCommentSaveCounter;
