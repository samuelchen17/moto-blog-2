import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { Avatar } from "flowbite-react";

interface ICommentSection {
  postId: string;
}

const CommentSection = ({ postId }: ICommentSection) => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  return (
    <div>
      {currentUser ? (
        <div className="flex flex-row">
          <p>Signed in as:</p>
          <Link to="/dashboard?tag=profile" className="flex flex-row">
            <Avatar
              img={currentUser.user.profilePicture}
              rounded
              alt={currentUser.user.username}
              className=""
            />
            <div>@{currentUser.user.username}</div>
          </Link>
        </div>
      ) : (
        <div>Sign in to comment</div>
      )}
    </div>
  );
};

export default CommentSection;
