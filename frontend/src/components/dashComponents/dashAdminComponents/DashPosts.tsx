import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Table } from "flowbite-react";
import { IPostResponse, IPost } from "@shared/types/post";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const DashPosts = () => {
  // implement, type array of data.posts
  const [userAdminPosts, setUserAdminPosts] = useState<IPost[]>([]);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  console.log(userAdminPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/post/getposts?createdBy=${currentUser?.user.id}`
        );
        // implement api response type
        const data: IPostResponse = await res.json();
        if (res.ok) {
          setUserAdminPosts(data.posts);
        }
      } catch (err) {}
    };

    if (currentUser?.user.admin) {
      fetchPosts();
    }
  }, [currentUser?.user.id]);

  return (
    <div className="w-full">
      {currentUser?.user.admin && userAdminPosts.length > 0 ? (
        // implement tailwind-scrollbar? for mobile
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {userAdminPosts.map((post) => (
                <Table.Row
                  key={post.slug}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {format(new Date(post.updatedAt), "dd MMM yyyy")}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Delete
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/update-post/${post._id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <p>No posts created yet!</p>
      )}
    </div>
  );
};

export default DashPosts;
