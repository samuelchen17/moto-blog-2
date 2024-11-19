import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { openLogin } from "../../redux/features/modal/authModalSlice";
import CommentSectionAddComment from "./CommentSectionAddComment";
import CommentSectionComments from "./CommentSectionComments";

export interface ICommentSection {
  postId: string;
}

const CommentSection = ({ postId }: ICommentSection) => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const dispatch = useAppDispatch();

  return (
    <div className="outline-red-500 outline max-w-screen-md w-full">
      {/* user info + sign in redirect */}
      {currentUser ? (
        <div className="flex flex-row items-center gap-2">
          <p>Signed in as:</p>
          <Link
            to="/dashboard?tab=profile"
            className="flex flex-row items-center gap-1"
          >
            <img
              src={currentUser.user.profilePicture}
              alt={currentUser.user.username}
              className="h-7 w-7-cover rounded-full"
            />
            <div className="hover:underline text-blue-500">
              @{currentUser.user.username}
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex flex-row">
          <div>
            <button
              onClick={() => dispatch(openLogin())}
              className="text-cyan-700 hover:underline dark:text-cyan-500"
            >
              Sign in
            </button>{" "}
            to comment
          </div>
        </div>
      )}

      {/* comment form  */}
      {currentUser && <CommentSectionAddComment postId={postId} />}

      {/* display comments */}
      <CommentSectionComments postId={postId} />
    </div>
  );
};

export default CommentSection;
