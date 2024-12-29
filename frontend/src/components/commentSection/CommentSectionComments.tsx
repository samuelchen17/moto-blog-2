import { useEffect, useState } from "react";
import { ICommentSection } from "./CommentSection";
import CommentSectionComment from "./CommentSectionComment";
import { ICommentResponse } from "src/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  setComments,
  setTotalComments,
} from "../../redux/features/comment/commentSlice";
import { _get } from "@/api/axiosClient";

// implement collapse comment section!!

const CommentSectionComments = ({ postId }: ICommentSection) => {
  //   const [comments, setComments] = useState<IComment[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const { comments } = useAppSelector((state: RootState) => state.comment);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await _get<ICommentResponse>(
          `/comment/getcomments/${postId}`
        );

        const data = res.data;
        dispatch(setComments(data.comments));
        dispatch(setTotalComments(data.totalComments));

        if (data.comments.length < 3) {
          setShowMore(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getComments();
  }, [postId]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await _get<ICommentResponse>(
        `/comment/getcomments/${postId}?startIndex=${startIndex}`
      );
      const data = res.data;

      dispatch(setComments([...comments, ...data.comments]));
      if (data.comments.length < 3) {
        setShowMore(false);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // implement pages for comments? show more to show everything?

  return (
    <>
      {/* display comment number */}
      {comments.length === 0 && (
        <p className="pt-4">No comments on this post.</p>
      )}
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
