import { useEffect } from "react";
import { ICommentSection } from "./CommentSection";

const CommentSectionComments = ({ postId }: ICommentSection) => {
  useEffect(() => {}, [postId]);
  return <div>CommentSectionComments</div>;
};

export default CommentSectionComments;
