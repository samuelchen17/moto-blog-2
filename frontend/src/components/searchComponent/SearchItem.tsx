import { Separator } from "@/components/ui/separator";
import { IPostWithAuthor } from "src/types";
import { Bookmark, MessageSquare, ThumbsUp } from "lucide-react";
import TimeAgo from "../wrapperComponents/TimeAgo";
import { _get } from "@/api/axiosClient";
import ProfileLinkWrapper from "../wrapperComponents/ProfileLinkWrapper";
import { Link } from "react-router-dom";

const SearchItem = ({ post }: { post: IPostWithAuthor }) => {
  return (
    <div>
      <div className="flex flex-col w-full mt-12">
        {/* author information */}
        <ProfileLinkWrapper userId={post?.createdBy._id}>
          <div className=" flex gap-2 items-center mb-2 hover:underline">
            <img
              className="h-5 w-5 rounded-full bg-gray-400 "
              src={post?.createdBy.profilePicture}
            />

            <span className="text-sm">{post?.createdBy.username}</span>
          </div>
        </ProfileLinkWrapper>

        {/* title and content */}
        <Link to={`/blogs/post/${post.slug}`}>
          <div className="flex flex-row justify-between">
            <div className="mb-2 mr-6">
              <h2 className="md:text-xl font-bold mt-2 mb-1 line-clamp-2 md:line-clamp-none">
                {post.title}
              </h2>
              <p
                className="text-gray-500 mb-4 line-clamp-2 md:line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="flex gap-4 items-center">
                <span className="text-xs text-gray-500">
                  <TimeAgo date={post.createdAt} />
                </span>
                <div className="flex gap-1 items-center text-gray-500">
                  <ThumbsUp size={14} className="" />
                  <span className="text-xs">{post.likes}</span>
                </div>
                <div className="flex gap-1 items-center text-gray-500">
                  <MessageSquare size={14} />
                  <span className="text-xs">{post.comments}</span>
                </div>
                <div className="flex gap-1 items-center text-gray-500">
                  <Bookmark size={14} />
                  <span className="text-xs">{post.saves}</span>
                </div>
              </div>
            </div>

            {/* search item image */}
            <img
              src={post.image}
              className="md:w-[300px] md:h-[200px] sm:w-[150px] w-[100px] h-[100px] object-cover rounded-md"
            />
          </div>
        </Link>
      </div>
      <Separator className="my-12" />
    </div>
  );
};

export default SearchItem;
