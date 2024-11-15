import { Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { ICommentSection } from "./CommentSection";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const CommentSectionAddComment = ({ postId }: ICommentSection) => {
  const [comment, setComment] = useState<string>("");
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch("/api/comment/postcomment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          content: comment,
          commentBy: currentUser?.user.id,
        }),
      });

      const data = res.json();

      if (res.ok) {
        setComment("");
      }

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="border border-teal-500 rounded-md p-3"
      onSubmit={handleSubmit}
    >
      <Textarea
        placeholder="Add a comment..."
        rows={3}
        maxLength={200}
        onChange={handleOnChange}
        value={comment}
      />
      <div className="flex justify-between items-center mt-5">
        <span className="text-gray-500 text-xs">
          {200 - comment.length} characters remaining
        </span>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default CommentSectionAddComment;
