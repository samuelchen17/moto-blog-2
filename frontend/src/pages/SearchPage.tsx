import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <div>
          <div className="mt-12 flex gap-2 items-center mb-5">
            <div className="bg-red-500 h-5 w-5 rounded-full" />
            <span className="text-sm">Guest Author</span>
          </div>

          <h2 className="text-xl font-bold mb-1">Ai is killing coding</h2>
          <p className="text-gray-500">Content of the post, goes here ...</p>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
