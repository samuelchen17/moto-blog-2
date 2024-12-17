import { Separator } from "@/components/ui/separator";
import { MessageCircle, ThumbsUp } from "lucide-react";

const SearchItem = () => {
  return (
    <>
      <div className="flex flex-col w-full mt-12">
        {/* author information */}
        <div className=" flex gap-2 items-center mb-2">
          <div className="bg-gray-400 h-5 w-5 rounded-full" />
          <span className="text-sm">Guest Author</span>
        </div>

        {/* title and content */}
        <div className="flex flex-row">
          <div className="mb-2 mr-6">
            <h2 className="text-xl font-bold mt-2 mb-1">
              Ai is killing coding
            </h2>
            <p className="text-gray-500 mb-4">
              Content of the post, goes here jfjdsl alks jflkdsaj klfsjadkl
              fjaslk jflksdajf lkajsfklsdjklsd fjkldsja lkfjdslk jfaskl jflksadj
              flkasjdflk;djsal;k fjeiolwaj ilejf lesj fljasfile jaf
              iaewjfijioewa jfioawej fliaewjf ioawjfil
              jwiajfoiwjjfklsdjflewjifjwej...
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
          <img src="" className="outline w-1/4 object-cover" />
        </div>
      </div>
      <Separator className="my-12" />
    </>
  );
};

export default SearchItem;
