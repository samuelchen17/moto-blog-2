import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Alert, Button, Modal, Table } from "flowbite-react";
import { IPostResponse, IPost } from "@shared/types/post";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const DashUsers = () => {
  const [userAdminPosts, setUserAdminPosts] = useState<IPost[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setErrorMessage(null);
        const res = await fetch(
          `/api/post/getposts?createdBy=${currentUser?.user.id}`
        );
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

  // change to handle delete user
  const handleDeletePost = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(
        `/api/post/delete/${postIdToDelete}/${currentUser?.user.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setUserAdminPosts((prev) =>
        prev.filter((post) => post._id !== postIdToDelete)
      );
    } catch (err) {
      console.error("Error:", err);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  return (
    <div className="w-full">
      {currentUser?.user.admin && userAdminPosts.length > 0 ? (
        // implement tailwind-scrollbar? for mobile
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Date Joined</Table.HeadCell>
              <Table.HeadCell>Profile image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
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
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                    >
                      Delete
                    </button>
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
          {errorMessage && (
            <Alert
              color="failure"
              className="text-center justify-center items-center"
            >
              {errorMessage}
            </Alert>
          )}
        </div>
      ) : (
        <p>No posts created yet!</p>
      )}

      {/* delete post modal */}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        dismissible
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashUsers;
