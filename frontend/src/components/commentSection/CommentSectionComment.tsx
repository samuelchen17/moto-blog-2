import { IComment } from "@shared/types/comment";
import { IGetUser } from "@shared/types/user";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FaThumbsUp } from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const TimeAgo = ({ date }: { date: string | Date }) => {
  return (
    <span className="text-sm text-gray-500">
      {formatDistanceToNow(new Date(date), { addSuffix: true })}
    </span>
  );
};

const CommentSectionComment = ({
  comment,
  handleLike,
}: {
  comment: IComment;
  handleLike: (commentId: string) => Promise<void>;
}) => {
  const [commentBy, setCommentBy] = useState<IGetUser | null>(null);

  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/${comment.commentBy}`);
        if (res.ok) {
          const data: IGetUser = await res.json();
          setCommentBy(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, [comment]);
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={commentBy?.profilePicture}
          alt={commentBy?.username}
          className="rounded-full h-10 w-10 bg-gray-400"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold truncate mr-1 text-sm">
            {commentBy ? `@${commentBy?.username}` : "Deleted User"}
          </span>
          <TimeAgo date={comment.createdAt} />
        </div>

        <p className="text-gray-500 mb-2">{comment.content}</p>

        {/* max-w-fit useful for fitting to size */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser.user.id) &&
              "!text-blue-500"
            }`}
            onClick={() => handleLike(comment._id)}
          >
            <FaThumbsUp className="" />
          </button>
          <p className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentSectionComment;
