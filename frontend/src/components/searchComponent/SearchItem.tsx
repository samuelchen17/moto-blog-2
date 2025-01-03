import { Separator } from "@/components/ui/separator";
import { IPostWithAuthor } from "src/types";
import { MessageCircle, ThumbsUp } from "lucide-react";
import TimeAgo from "../TimeAgo";
import { _get } from "@/api/axiosClient";

const SearchItem = ({ post }: { post: IPostWithAuthor }) => {
  return (
    <>
      <div className="flex flex-col w-full mt-12">
        {/* author information */}
        <div className=" flex gap-2 items-center mb-2">
          <img
            className="h-5 w-5 rounded-full bg-gray-400 "
            src={post?.createdBy.profilePicture}
          />

          <span className="text-sm">{post?.createdBy.username}</span>
        </div>

        {/* title and content */}
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
                <span className="text-xs">72</span>
              </div>
              <div className="flex gap-1 items-center text-gray-500">
                <MessageCircle size={14} />
                <span className="text-xs">13</span>
              </div>
            </div>
          </div>

          {/* search item image */}
          <img
            src={post.image}
            className="md:w-[300px] md:h-[200px] sm:w-[150px] w-[100px] h-[100px] object-cover"
          />
        </div>
      </div>
      <Separator className="my-12" />
    </>
  );
};

export default SearchItem;
