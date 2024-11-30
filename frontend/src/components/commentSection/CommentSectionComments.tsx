import { useEffect, useState } from "react";
import { ICommentSection } from "./CommentSection";
import CommentSectionComment from "./CommentSectionComment";
import { IComment } from "@shared/types/comment";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setComments } from "../../redux/features/comment/commentSlice";

// implement collapse comment section!!

const CommentSectionComments = ({ postId }: ICommentSection) => {
  //   const [comments, setComments] = useState<IComment[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const { comments } = useAppSelector((state: RootState) => state.comment);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments/${postId}`);

        if (res.ok) {
          // move all data inside res.ok implement
          const data: IComment[] = await res.json();
          dispatch(setComments(data));

          if (data.length < 3) {
            setShowMore(false);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    const handleShowMore = async () => {
      const startIndex = allComments.length;
      try {
        setErrorMessage(null);
        const res = await fetch(
          `/api/comment/getcomments/${postId}?startIndex=${startIndex}`
        );
        const data: IComment[] = await res.json();

        if (res.ok) {
          setAllComments((prev) => [...prev, ...data.comments]);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (err) {
        console.error("Error:", err);
        setErrorMessage("Failed to show more, internal error");
      }
    };

    getComments();
  }, [postId]); // add comment here so it updates user comment, changed to show in state to prevent unnecessary fetch requests

  return (
    <>
      {/* display comment number */}
      {comments.length === 0 && <p>No comments on this post</p>}
      {comments.map((comment) => (
        <CommentSectionComment key={comment._id} comment={comment} />
      ))}
    </>
  );
};

export default CommentSectionComments;
