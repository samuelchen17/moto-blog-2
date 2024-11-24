import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [post, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);

  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  return <div>Dashboard</div>;
};

export default Dashboard;
