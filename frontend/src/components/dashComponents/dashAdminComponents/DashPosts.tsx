import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

interface IPosts {}

const DashPosts = () => {
  // implement, type array of data.posts
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/post/getposts?createdBy=${currentUser?.user.id}`
        );
        // implement api response type
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (err) {}
    };
  }, [currentUser?.user.id]);

  return <div>DashPosts</div>;
};

export default DashPosts;
