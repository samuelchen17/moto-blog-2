import { IComment } from "@shared/types/comment";

const CommentSectionComment = ({ comment }: { comment: IComment }) => {
  return <div>{comment.content}</div>;
};

export default CommentSectionComment;
