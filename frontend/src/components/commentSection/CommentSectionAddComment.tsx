import { Button, Textarea } from "flowbite-react";
import { useState } from "react";

const CommentSectionAddComment = () => {
  const [comment, setComment] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(comment);
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
