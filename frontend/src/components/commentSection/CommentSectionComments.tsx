import { useEffect, useState } from "react";
import { ICommentSection } from "./CommentSection";
import CommentSectionComment from "./CommentSectionComment";
import { IComment } from "@shared/types/comment";

const CommentSectionComments = ({ postId }: ICommentSection) => {
  // useState for displaying comments
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments/${postId}`);

        if (res.ok) {
          // move all data inside res.ok implement
          const data: IComment[] = await res.json();
          setComments(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getComments();
  }, [postId]); // add comment here so it updates user comment

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
