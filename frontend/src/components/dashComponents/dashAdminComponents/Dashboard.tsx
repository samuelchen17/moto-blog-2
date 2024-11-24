import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { IGetUser, IGetUserResponse } from "@shared/types/user";
import { IComment, ICommentResponse } from "@shared/types/comment";
import { IPost, IPostResponse } from "@shared/types/post";

const Dashboard = () => {
  const [users, setUsers] = useState<IGetUser[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);
  const [post, setPosts] = useState<IPost[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [lastMonthUsers, setLastMonthUsers] = useState<number>(0);
  const [lastMonthComments, setLastMonthComments] = useState<number>(0);
  const [lastMonthPosts, setLastMonthPosts] = useState<number>(0);

  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/${currentUser?.user.id}?limit=5`);
        const data: IGetUserResponse = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (err) {
        console.error(err);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `/api/comment/getallcomments/${currentUser?.user.id}?limit=5`
        );
        const data: ICommentResponse = await res.json();

        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (err) {
        console.error(err);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data: IPostResponse = await res.json();

        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (currentUser?.user.admin) {
      fetchUsers();
      fetchComments();
      fetchPosts();
    }
  }, [currentUser]);

  return <div>Dashboard</div>;
};

export default Dashboard;
