import { Button, Textarea } from "flowbite-react";

const CommentSectionAddComment = () => {
  return (
    <form className="border border-teal-500 rounded-md p-3">
      <Textarea placeholder="Add a comment..." rows={3} maxLength={200} />
      <div className="flex justify-between items-center mt-5">
        {" "}
        <span className="text-gray-500 text-xs">200 characters remaining</span>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default CommentSectionAddComment;
