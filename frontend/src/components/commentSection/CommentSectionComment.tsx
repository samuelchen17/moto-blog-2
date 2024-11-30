import { IComment } from "@shared/types/comment";
import { IGetUser } from "@shared/types/user";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FaThumbsUp } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Modal } from "flowbite-react";
import { openLogin } from "../../redux/features/modal/authModalSlice";
import { setComments } from "../../redux/features/comment/commentSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

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
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const { comments } = useAppSelector((state: RootState) => state.comment);

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    setIsEditing(true);
    // this is so that if user doesn't save, it still displays original content
    setEditedContent(comment.content);
  };

  // edit comment logic
  const handleSave = async (commentId: string) => {
    try {
      const res = await fetch(
        `/api/comment/edit/${comment._id}/${currentUser?.user.id}/${comment.commentBy}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: editedContent }),
        }
      );

      if (res.ok) {
        setIsEditing(false);
        dispatch(
          setComments(
            comments.map((comment) =>
              comment._id === commentId
                ? {
                    ...comment,
                    content: editedContent,
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

  // comment like logic
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

  // delete comment logic
  const handleDelete = async (commentId: string) => {
    try {
      if (!currentUser) {
        dispatch(openLogin());
        return;
      }

      const res = await fetch(
        `/api/comment/delete/${comment._id}/${currentUser?.user.id}/${comment.commentBy}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch(
          setComments(comments.filter((comment) => comment._id !== commentId))
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
    <div className="flex py-6 border-b dark:border-gray-800 text-sm">
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
          <div className="flex flex-col gap-2">
            <Textarea
              className="w-full rounded-md"
              rows={3}
              maxLength={200}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button type="button" onClick={() => handleSave(comment._id)}>
                Save
              </Button>
              <Button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
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
                  <>
                    <button
                      className="text-gray-400 hover:underline hover:text-blue-500"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <button
                      className="text-gray-400 hover:underline hover:text-red-500"
                      onClick={() => setOpenModal(true)}
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>

      {/* delete confirmation modal */}
      {openModal && (
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          dismissible
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this comment?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => {
                    setOpenModal(false);
                    handleDelete(comment._id);
                  }}
                >
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default CommentSectionComment;
