import { useEffect } from "react";
import { ICommentSection } from "./CommentSection";

const CommentSectionComments = ({ postId }: ICommentSection) => {
  // useState for displaying comments
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments/${postId}`);

        if (res.ok) {
          // move all data inside res.ok implement
          const data = await res.json();
          //   setComments(data); implement
        }
      } catch (err) {
        console.log(err);
      }
    };

    getComments();
  }, [postId]);
  return <div>CommentSectionComments</div>;
};

export default CommentSectionComments;
