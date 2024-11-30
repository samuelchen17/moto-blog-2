import { Alert } from "flowbite-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { ICommentSection } from "./CommentSection";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  addComment,
  setComment,
} from "../../redux/features/comment/commentSlice";

const CommentSectionAddComment = ({ postId }: ICommentSection) => {
  //   const [comment, setComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const { comment } = useAppSelector((state: RootState) => state.comment);

  const dispatch = useAppDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setComment(e.target.value));
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
      const data = await res.json();
      if (res.ok) {
        // update using state instead of fetching data again
        dispatch(addComment(data));
        dispatch(setComment(""));
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
      console.log(err);
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <Textarea
          placeholder="Add a comment..."
          className="focus:ring-gray-700 focus:border-gray-700"
          rows={3}
          maxLength={200}
          onChange={handleOnChange}
          value={comment}
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-500 text-xs">
            {200 - comment.length} characters remaining
          </span>
          <Button type="submit">Submit</Button>
        </div>
      </form>
      {errorMessage && (
        <Alert color="failure" className=" mt-2">
          {errorMessage}
        </Alert>
      )}
      <hr className="mt-12" />
    </>
  );
};

export default CommentSectionAddComment;
