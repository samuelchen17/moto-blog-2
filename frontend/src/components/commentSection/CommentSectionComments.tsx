import { useEffect, useState } from "react";
import { ICommentSection } from "./CommentSection";
import CommentSectionComment from "./CommentSectionComment";
import { IComment } from "@shared/types/comment";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setComments } from "../../redux/features/comment/commentSlice";

const CommentSectionComments = ({ postId }: ICommentSection) => {
  //   const [comments, setComments] = useState<IComment[]>([]);
  const { comment, comments } = useAppSelector(
    (state: RootState) => state.comment
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments/${postId}`);

        if (res.ok) {
          // move all data inside res.ok implement
          const data: IComment[] = await res.json();
          dispatch(setComments(data));
        }
      } catch (err) {
        console.log(err);
      }
    };

    getComments();
  }, [postId, comment]); // add comment here so it updates user comment

  console.log(comments);
  return (
    <>
      {/* display comment number */}
      {comments.length === 0 ? (
        <p>No comments on this post</p>
      ) : (
        <div className="flex gap-2 items-center">
          <p>Comments</p>
          <div className="outline py-1 px-2">{comments.length}</div>
        </div>
      )}
      {comments.map((comment) => (
        <CommentSectionComment key={comment._id} />
      ))}
    </>
  );
};

export default CommentSectionComments;
