import { IGetUser, IPostWithAuthor } from "@/types";
import { Bookmark, MessageSquare, ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { _get, _patch } from "@/api/axiosClient";

const PostInteractionsBar = ({ post }: { post: IPostWithAuthor }) => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const [like, setLike] = useState({
    liked: false,
    likeCount: post.likes,
  });

  const [save, setSave] = useState({
    saved: false,
    saveCount: post.saves,
  });

  // get initial state of saved and comment icons
  useEffect(() => {
    if (currentUser) {
      const fetchSavedLikedList = async () => {
        try {
          const res = await _get<IGetUser>(`/${currentUser.user.id}`);
          const data = res.data;

          setLike((prev) => ({
            ...prev,
            liked:
              Array.isArray(data.likedPosts) &&
              data.likedPosts.some(
                (likedPostId) => String(likedPostId) === String(post._id)
              ),
          }));

          setSave((prev) => ({
            ...prev,
            saved:
              Array.isArray(data.savedPosts) &&
              data.savedPosts.some(
                (savedPostId) => String(savedPostId) === String(post._id)
              ),
          }));
        } catch (err) {
          console.error(err);
        }
      };

      fetchSavedLikedList();
    }
  }, [currentUser, post._id]);

  const handleLike = async () => {
    setLike((prev) => ({
      liked: !prev.liked,
      likeCount: prev.liked ? prev.likeCount - 1 : prev.likeCount + 1,
    }));

    try {
      await _patch(`post/like-post/${currentUser?.user.id}/${post._id}`);
    } catch (err) {
      console.error(err);

      setLike((prev) => ({
        liked: !prev.liked,
        likeCount: prev.liked ? prev.likeCount - 1 : prev.likeCount + 1,
      }));
    }
  };

  const handleSave = async () => {
    setSave((prev) => ({
      saved: !prev.saved,
      saveCount: prev.saved ? prev.saveCount - 1 : prev.saveCount + 1,
    }));

    try {
      await _patch(`post/save-post/${currentUser?.user.id}/${post._id}`);
    } catch (err) {
      console.error(err);

      setSave((prev) => ({
        saved: !prev.saved,
        saveCount: prev.saved ? prev.saveCount - 1 : prev.saveCount + 1,
      }));
    }
  };

  return (
    <div className="space-y-5 mb-12">
      <Separator />
      <div className="flex justify-between">
        {/* like comment and saves */}
        <div className="flex gap-6">
          <div className="flex items-center text-center gap-1">
            <button
              onClick={handleLike}
              className={`flex items-center text-center gap-1 cursor-pointer ${
                like.liked ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
            </button>
            <span className="text-xs">{like.likeCount}</span>
          </div>
          <div className="flex items-center text-center gap-1">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">{post.comments}</span>
          </div>
          <div className="flex items-center text-center gap-1">
            <button
              onClick={handleSave}
              className={`flex items-center text-center gap-1 cursor-pointer ${
                save.saved ? "text-red-500" : "text-gray-500"
              }`}
            >
              <Bookmark className="w-5 h-5" />
            </button>
            <span className="text-xs">{save.saveCount}</span>
          </div>
        </div>

        {/* date posted/updated */}
        <div className="font-semibold uppercase">
          {post.createdAt === post.updatedAt ? (
            <div>Posted: {format(new Date(post.createdAt), "dd MMM yyyy")}</div>
          ) : (
            <div>
              Updated: {format(new Date(post.updatedAt), "dd MMM yyyy")}
            </div>
          )}
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default PostInteractionsBar;
