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

        <div>content</div>
      </div>
    </div>
  );
};

export default SearchPage;
