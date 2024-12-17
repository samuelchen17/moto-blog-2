import SearchBar from "@/components/searchComponent/SearchBar";
import SearchItem from "@/components/searchComponent/SearchItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface ISearchParams {
  searchTerm: string;
  sort: "asc" | "desc";
  category: string;
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSearchParams({
        ...searchParams,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
  }, [location.search]);

  console.log(searchParams);

  return (
    <div className="flex flex-col gap-6 my-12 px-4 max-w-screen-xl mx-auto ">
      {/* mobile screen search */}
      <div className="sm:hidden">
        <SearchBar />
      </div>

      <div>
        <h1 className="font-bold text-2xl mb-6 flex">
          <div className="text-gray-500">Results for</div> &nbsp;search
        </h1>
        <div className="flex justify-between flex-col sm:flex-row">
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
        </div>

        {/* search */}
        <SearchItem />
        <SearchItem />
      </div>
    </div>
  );
};

export default SearchPage;
