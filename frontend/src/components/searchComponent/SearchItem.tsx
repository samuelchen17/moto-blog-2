import { Separator } from "@/components/ui/separator";
import { IPost } from "src/types";
import { MessageCircle, ThumbsUp } from "lucide-react";
import TimeAgo from "../TimeAgo";
import { useEffect, useState } from "react";
import { IGetUser } from "src/types";

const SearchItem = ({ post }: { post: IPost }) => {
  const [author, setAuthor] = useState<IGetUser | null>(null);
  // get comments, likes implement
  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const authorId = post.createdBy;

        if (authorId) {
          const authorRes = await fetch(`/api/${authorId}`);
          const authorData: IGetUser = await authorRes.json();

          if (!authorRes.ok) {
            throw new Error("Failed to fetch author");
          }

          setAuthor(authorData);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAuthor();
  }, [author]);

  return (
    <>
      <div className="flex flex-col w-full mt-12">
        {/* author information */}
        <div className=" flex gap-2 items-center mb-2">
          <img
            className="h-5 w-5 rounded-full bg-gray-400 "
            src={author?.profilePicture}
          />

          <span className="text-sm">{author?.username}</span>
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
