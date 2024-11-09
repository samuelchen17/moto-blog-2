import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Alert, Table } from "flowbite-react";
import { IPostResponse, IPost } from "@shared/types/post";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const DashPosts = () => {
  // implement, type array of data.posts
  const [userAdminPosts, setUserAdminPosts] = useState<IPost[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  console.log(userAdminPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setErrorMessage(null);
        const res = await fetch(
          `/api/post/getposts?createdBy=${currentUser?.user.id}`
        );
        // implement api response type
        const data: IPostResponse = await res.json();
        if (res.ok) {
          setUserAdminPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (err) {
        console.error("Error:", err);
        setErrorMessage("Failed to fetch posts, internal error");
      }
    };

    if (currentUser?.user.admin) {
      fetchPosts();
    }
  }, [currentUser?.user.id]);

  const handleShowMore = async () => {
    const startIndex = userAdminPosts.length;
    try {
      setErrorMessage(null);
      const res = await fetch(
        `/api/post/getposts?createdBy=${currentUser?.user.id}&startIndex=${startIndex}`
      );
      const data: IPostResponse = await res.json();

      if (res.ok) {
        setUserAdminPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Failed to show more, internal error");
    }
  };

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
          {showMore && (
            // implement style button
            <button
              onClick={handleShowMore}
              className="self-center w-full text-red-500 py-6"
            >
              Show more
            </button>
          )}
          {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
        </div>
      ) : (
        <p>No posts created yet!</p>
      )}
    </div>
  );
};

export default DashPosts;
