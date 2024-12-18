import SearchBar from "@/components/searchComponent/SearchBar";
import SearchItem from "@/components/searchComponent/SearchItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IPost, IPostResponse } from "@shared/types/post";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface ISearchParams {
  searchTerm: string;
  sort: string;
  category: string;
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState<IPost[]>([]);
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
        searchTerm: searchTermFromUrl ?? searchParams.searchTerm,
        sort: sortFromUrl ?? searchParams.sort,
        category: categoryFromUrl ?? searchParams.category,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
          return;
        }

        const data: IPostResponse = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  console.log(searchParams);
  console.log(posts);

  return (
    <div className="flex flex-col gap-6 my-12 px-4 max-w-screen-xl mx-auto ">
      {/* mobile screen search */}
      <div className="sm:hidden">
        <SearchBar />
      </div>

      <div>
        <h1 className="font-bold text-2xl mb-6 flex">
          <div className="text-gray-500">Results for</div> &nbsp;
          {searchParams.searchTerm}
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
        {posts.map((post) => (
          <SearchItem post={post} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
