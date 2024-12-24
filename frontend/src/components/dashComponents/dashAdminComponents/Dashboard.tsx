import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { IGetUser, IGetUserResponse } from "src/types";
import { IComment, IAllCommentResponse } from "src/types";
import { IPost, IPostResponse } from "src/types";
import { Button, Table } from "flowbite-react";

// implement styles, fix dashboard

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
        const data: IAllCommentResponse = await res.json();

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

  return (
    <div className="grid md:grid-cols-2 md:grid-rows-3 gap-4 grid-cols-1 w-full">
      <div className=" outline">
        <h2>Total Users</h2>
        <p>{totalUsers}</p>
        <p>{lastMonthUsers} Last month</p>
      </div>
      <div className="outline">
        <Button>See all</Button>
        {users.map((user) => (
          <div key={user._id}>
            <img
              className="h-10 w-10 object-cover rounded-full"
              src={user.profilePicture}
            />
            <div>{user.username}</div>
          </div>
        ))}
      </div>
      <div className=" ">
        <h2>Total comments</h2>
        <p>{totalUsers}</p>
        <p>{lastMonthUsers} Last month</p>
      </div>
      <div>content comments</div>
      <div className=" ">
        <h2>Total posts</h2>
        <p>{totalUsers}</p>
        <p>{lastMonthUsers} Last month</p>
      </div>
      <div>content posts</div>

      {/* <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell>Color</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {'Apple MacBook Pro 17"'}
              </Table.Cell>
              <Table.Cell>Sliver</Table.Cell>
              <Table.Cell>Laptop</Table.Cell>
              <Table.Cell>$2999</Table.Cell>
              <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Microsoft Surface Pro
              </Table.Cell>
              <Table.Cell>White</Table.Cell>
              <Table.Cell>Laptop PC</Table.Cell>
              <Table.Cell>$1999</Table.Cell>
              <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Magic Mouse 2
              </Table.Cell>
              <Table.Cell>Black</Table.Cell>
              <Table.Cell>Accessories</Table.Cell>
              <Table.Cell>$99</Table.Cell>
              <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div> */}
    </div>
  );
};

// layout
{
  /* <div class="order-1 md:order-1">x1</div>
<div class="order-2 md:order-4">x2</div>
<div class="order-3 md:order-2">y1</div>
<div class="order-4 md:order-5">y2</div>
<div class="order-5 md:order-3">z1</div>
<div class="order-6 md:order-6">z2</div> */
}

export default Dashboard;
