import { useEffect, useState } from "react";
import { ICommentSection } from "./CommentSection";
import CommentSectionComment from "./CommentSectionComment";
import { IComment, ICommentResponse } from "@shared/types/comment";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  setComments,
  setTotalComments,
} from "../../redux/features/comment/commentSlice";

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
          const data: ICommentResponse = await res.json();
          dispatch(setComments(data.comments));
          dispatch(setTotalComments(data.totalComments));

          if (data.comments.length < 3) {
            setShowMore(false);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    getComments();
  }, [postId]); // add comment here so it updates user comment, changed to show in state to prevent unnecessary fetch requests

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments/${postId}?startIndex=${startIndex}`
      );
      const data: ICommentResponse = await res.json();

      if (res.ok) {
        dispatch(setComments([...comments, ...data.comments]));
        if (data.comments.length < 3) {
          setShowMore(false);
        }
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // implement pages for comments? show more to show everything?

  return (
    <>
      {/* display comment number */}
      {comments.length === 0 && <p>No comments on this post</p>}
      {comments.map((comment) => (
        <CommentSectionComment key={comment._id} comment={comment} />
      ))}
      {showMore && (
        // implement style button
        <button
          onClick={handleShowMore}
          className="self-center w-full text-red-500 py-6"
        >
          Show more
        </button>
      )}
    </>
  );
};

export default CommentSectionComments;
