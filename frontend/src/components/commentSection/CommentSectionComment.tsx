import { IComment } from "@shared/types/comment";
import { IGetUser } from "@shared/types/user";
import { useEffect, useState } from "react";

const CommentSectionComment = ({ comment }: { comment: IComment }) => {
  const [commentBy, setCommentBy] = useState<IGetUser | null>(null);

  console.log(commentBy);

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
  return <div>{comment.content}</div>;
};

export default CommentSectionComment;
