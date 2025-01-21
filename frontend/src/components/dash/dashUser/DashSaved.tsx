import { _get } from "@/api/axiosClient";
import SearchItem from "@/components/searchComponent/SearchItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { IPostWithAuthor } from "@/types";
import { MoveDown, MoveUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashSaved = () => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const [savedList, setSavedList] = useState<IPostWithAuthor[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("recent");

  // useEffect to get users saved list
  useEffect(() => {
    if (currentUser) {
      const fetchSavedList = async () => {
        try {
          const res = await _get<IPostWithAuthor[]>(
            `/saved-posts/${currentUser.user.id}`
          );
          const data = res.data;

          setSavedList(data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchSavedList();
    }
  }, [currentUser]);

  // sort list based on sort order
  const sortedList = (savedList || []).slice().sort((a, b) => {
    if (sortOrder === "desc") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOrder === "asc") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortOrder === "oldest") {
      return savedList.indexOf(a) - savedList.indexOf(b);
    } else if (sortOrder === "recent") {
      return savedList.indexOf(b) - savedList.indexOf(a);
    }
    return 0;
  });

  return (
    <div className="">
      <div className="flex justify-end">
        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Latest</SelectItem>
            <SelectItem value="asc">Oldest</SelectItem>
            <SelectItem value="recent">
              <div className="flex items-center justify-center text-center gap-1">
                <span>Recently Added </span>
                <MoveUp size={14} />
              </div>
            </SelectItem>
            <SelectItem value="oldest">
              <div className="flex items-center justify-center text-center gap-1">
                <span>Recently Added </span>
                <MoveDown size={14} />
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {savedList?.length === 0 ? (
        <div>Saved list is empty</div>
      ) : (
        sortedList?.map((post) => (
          <Link key={post._id} to={`/blogs/post/${post.slug}`}>
            <SearchItem post={post} />
          </Link>
        ))
      )}
    </div>
  );
};

export default DashSaved;
