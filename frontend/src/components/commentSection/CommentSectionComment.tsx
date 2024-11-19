import { IComment } from "@shared/types/comment";
import { IGetUser } from "@shared/types/user";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FaThumbsUp } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Button, Textarea } from "flowbite-react";
import { openLogin } from "../../redux/features/modal/authModalSlice";
import { setComments } from "../../redux/features/comment/commentSlice";

const TimeAgo = ({ date }: { date: string | Date }) => {
  return (
    <span className="text-sm text-gray-500">
      {formatDistanceToNow(new Date(date), { addSuffix: true })}
    </span>
  );
};

const CommentSectionComment = ({ comment }: { comment: IComment }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [commentBy, setCommentBy] = useState<IGetUser | null>(null);
  const [editedContent, setEditedContent] = useState<string>(comment.content);

  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const { comments } = useAppSelector((state: RootState) => state.comment);

  const dispatch = useAppDispatch();

  const handleEdit = async () => {
    setIsEditing(true);
    // this is so that if user doesn't save, it still displays original content
    setEditedContent(comment.content);
  };

  const handleLike = async (commentId: string) => {
    try {
      if (!currentUser) {
        dispatch(openLogin());
        return;
      }

      const res = await fetch(
        `/api/comment/like/${commentId}/${currentUser.user.id}`,
        { method: "PATCH" }
      );

      if (res.ok) {
        const data = await res.json();

        // loop through comments to find a match
        dispatch(
          setComments(
            comments.map((comment) =>
              comment._id === commentId
                ? {
                    // add likes and numberOfLikes to comment
                    ...comment,
                    likes: data.likes,
                    numberOfLikes: data.likes.length,
                  }
                : comment
            )
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

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

        {/* text area for editing */}
        {isEditing ? (
          <form className="flex flex-col gap-2">
            <Textarea
              className="w-full rounded-md"
              rows={3}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button type="button" size="sm">
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            {" "}
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
              {currentUser &&
                (currentUser.user.id === comment.commentBy ||
                  currentUser.user.admin) && (
                  <button
                    className="text-gray-400 hover:underline hover:text-blue-500"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentSectionComment;
