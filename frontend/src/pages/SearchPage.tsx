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
import { IPost, IPostResponse } from "@shared/types/post";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface ISearchParams {
  [key: string]: string;
  searchTerm: string;
  sort: string;
  category: string;
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    searchTerm: "",
    category: "",
    sort: "",
  });
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  // update search params from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setSearchParams({
      searchTerm: urlParams.get("searchTerm") || "",
      category: urlParams.get("category") || "",
      sort: urlParams.get("sort") || "desc",
    });
  }, [location.search]);

  // fetch posts when search params change
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const searchQuery = new URLSearchParams(searchParams).toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) return;

        const data: IPostResponse = await res.json();
        setPosts(data.posts);
        setShowMore(data.posts.length === 9);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchParams]);

  const handleChange = (id: keyof ISearchParams, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    const searchQuery = new URLSearchParams(searchParams).toString();
    navigate(`/search?${searchQuery}`, { replace: true });
  }, [searchParams, navigate]);

  const handleShowMore = async () => {
    const startIndex = posts.length.toString();
    try {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("startIndex", startIndex);
      const searchQuery = urlParams.toString();

      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) return;

      const data: IPostResponse = await res.json();

      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const urlParams = new URLSearchParams(location.search);
  //     urlParams.set("sort", searchParams.sort);
  //     urlParams.set("category", searchParams.category);

  //     const searchQuery = urlParams.toString();

  //     navigate(`/search?${searchQuery}`);
  //   };

  //   console.log(searchParams);
  //   console.log(posts);

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
              {/* <SelectItem value="all">All</SelectItem> */}
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
        {posts.map((post) => (
          <Link key={post._id} to={`/blogs/post/${post.slug}`}>
            <SearchItem post={post} />
          </Link>
        ))}
      </div>

      {showMore && (
        <button
          onClick={handleShowMore}
          className="self-center w-full text-red-500 py-6"
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default SearchPage;
