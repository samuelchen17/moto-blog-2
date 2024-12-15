import { Separator } from "@/components/ui/separator";
import { MessageCircle, ThumbsUp } from "lucide-react";

const SearchItem = () => {
  return (
    <>
      {" "}
      <div className="flex flex-col w-full mt-12">
        {/* author information */}
        <div className=" flex gap-2 items-center mb-4">
          <div className="bg-red-500 h-5 w-5 rounded-full" />
          <span className="text-sm">Guest Author</span>
        </div>

        {/* title and content */}
        <div className="flex flex-row">
          <div>
            <h2 className="text-xl font-bold mb-1">Ai is killing coding</h2>
            <p className="text-gray-500 mb-4">
              Content of the post, goes here jfjdsl alks jflkdsaj klfsjadkl
              fjaslk jflksdajf lkajsfklsdjklsd...
            </p>

            <div className="flex gap-4 items-center">
              <span className="text-xs text-gray-500">5d ago</span>
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
          <div className="outline w-[100px]" />
        </div>
      </div>
      <Separator className="my-12" />
    </>
  );
};

export default SearchItem;
