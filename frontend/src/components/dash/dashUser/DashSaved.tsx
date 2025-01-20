import { _get } from "@/api/axiosClient";
import SearchItem from "@/components/searchComponent/SearchItem";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { IPostWithAuthor } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashSaved = () => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const [savedList, setSavedList] = useState<IPostWithAuthor[]>();

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

  // console.log(savedList);

  return (
    <div className="">
      {savedList?.length === 0 ? (
        <div>Saved list is empty</div>
      ) : (
        savedList?.map((post) => (
          <Link key={post._id} to={`/blogs/post/${post.slug}`}>
            <SearchItem post={post} />
          </Link>
        ))
      )}
    </div>
  );
};

export default DashSaved;
