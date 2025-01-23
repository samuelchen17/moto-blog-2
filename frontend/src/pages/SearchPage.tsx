import SearchBar from "@/components/searchComponent/SearchBar";
import SearchItem from "@/components/searchComponent/SearchItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postCategory } from "@/config/postCategory.config";
import { IPostResponse, IPostWithAuthor } from "src/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSearchParams } from "react-router-dom";
import { _get } from "@/api/axiosClient";
import { SkeletonSearchItem } from "@/components/SkeletonComponents";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<IPostWithAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);

  //   update search params from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setSearchParams({
      searchTerm: urlParams.get("searchTerm") || "",
      category: urlParams.get("category") || "",
      sort: urlParams.get("sort") || "desc",
    });

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const searchQuery = new URLSearchParams(searchParams).toString();
        const res = await _get<IPostResponse>(`/post/getposts?${searchQuery}`);

        const data = res.data;
        setPosts(data.posts);
        setShowMore(data.posts.length === 9);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  // will also navigate to that page
  const handleChange = (key: string, value: string) => {
    // clone current url
    const params = new URLSearchParams(searchParams.toString());
    // update key
    params.set(key, value);
    setSearchParams(params);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length.toString();
    setShowMoreLoading(true);

    try {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("startIndex", startIndex);
      const searchQuery = urlParams.toString();

      const res = await _get<IPostResponse>(`/post/getposts?${searchQuery}`);

      const data = res.data;

      setPosts((prev) => [...prev, ...data.posts]);
      if (data.posts.length < 9) {
        setShowMore(false);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setShowMoreLoading(false);
    }
  };

  // console.log(searchParams);

  return (
    <div className="flex flex-col gap-6 my-12 px-4 max-w-screen-xl mx-auto ">
      {/* mobile screen search */}
      <div
      //   className="sm:hidden"
      >
        <SearchBar />
      </div>

      <div>
        <h1 className="font-bold text-2xl mb-6 flex">
          <div className="text-gray-500">Results for</div> &nbsp;
          {searchParams.get("searchTerm")}
        </h1>
        <form className="flex justify-between flex-row gap-4">
          {/* category */}
          <Select
            onValueChange={(value) => {
              handleChange("category", value);
            }}
            defaultValue=""
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {postCategory.slice(1).map((category) => (
                <SelectItem key={category.name} value={category.value}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* sort by */}
          <Select onValueChange={(value) => handleChange("sort", value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Latest</SelectItem>
              <SelectItem value="asc">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </form>

        {/* search */}
        {loading ? (
          <SkeletonSearchItem />
        ) : (
          posts.map((post) => (
            <Link key={post._id} to={`/blogs/post/${post.slug}`}>
              <SearchItem post={post} />
            </Link>
          ))
        )}

        {showMore && (
          <button
            onClick={handleShowMore}
            className="self-center w-full text-red-500 py-6"
            disabled={showMoreLoading}
          >
            {showMoreLoading ? "Loading..." : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
