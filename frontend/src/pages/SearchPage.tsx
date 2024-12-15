import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle, ThumbsUp } from "lucide-react";

const SearchPage = () => {
  return (
    <div className="flex flex-col gap-6 my-12 px-4 max-w-screen-xl mx-auto ">
      <input></input>
      {/* hot posts */}
      <div>
        <h1 className="font-bold text-2xl mb-6 flex">
          <div className="text-gray-500">Results for</div> &nbsp;search
        </h1>
        <div className="flex justify-between">
          {/* sort by */}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Latest</SelectItem>
              <SelectItem value="2">Oldest</SelectItem>
            </SelectContent>
          </Select>

          {/* category */}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Motorcycle</SelectItem>
              <SelectItem value="2">Gear</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* search */}
        <div className="flex w-full outline mt-12">
          {/* search item information */}
          <div>
            <div className=" flex gap-2 items-center mb-5">
              <div className="bg-red-500 h-5 w-5 rounded-full" />
              <span className="text-sm">Guest Author</span>
            </div>

            <h2 className="text-xl font-bold mb-1">Ai is killing coding</h2>
            <p className="text-gray-500">Content of the post, goes here ...</p>

            <div className="flex gap-6 items-center">
              <span className="text-xs text-gray-500">5d ago</span>

              <div className="flex gap-1 items-center text-gray-500">
                <ThumbsUp size={16} className="" />
                <span className="text-xs">72</span>
              </div>
              <div className="flex gap-1 items-center text-gray-500">
                <MessageCircle size={16} />
                <span className="text-xs">13</span>
              </div>
            </div>
          </div>

          {/* search item image */}
          <div className="outline w-[100px]"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
