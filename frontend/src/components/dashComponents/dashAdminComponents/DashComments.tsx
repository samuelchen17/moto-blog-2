import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Alert, Button, Modal, Table } from "flowbite-react";
import { IGetUserResponse } from "@shared/types/user";
import { format } from "date-fns";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IComment } from "@shared/types/comment";

const DashComments = () => {
  const [allComments, setAllComments] = useState<IComment[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setErrorMessage(null);
        const res = await fetch(
          `/api/comment/getallcomments/${currentUser?.user.id}`
        );
        const data: IComment[] = await res.json();
        if (res.ok) {
          setAllComments(data);
          if (data.length < 9) {
            setShowMore(false);
          }
        }
      } catch (err) {
        console.error("Error:", err);
        setErrorMessage("Failed to fetch comments, internal error");
      }
    };

    if (currentUser?.user.admin) {
      fetchComments();
    }
  }, [currentUser?.user.id, allComments]);

  const handleShowMore = async () => {
    const startIndex = allComments.length;
    try {
      setErrorMessage(null);
      const res = await fetch(
        `/api/user/${currentUser?.user.id}&startIndex=${startIndex}`
      );
      const data: IComment[] = await res.json();

      if (res.ok) {
        setAllComments((prev) => [...prev, ...data]);
        if (data.length < 9) {
          setShowMore(false);
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Failed to show more, internal error");
    }
  };

  // change to handle delete user
  const handleDeleteUser = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(
        `/api/user/admin/${currentUser?.user.id}/${idToDelete}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setIdToDelete(null);
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
      {currentUser?.user.admin && allComments.length > 0 ? (
        // implement tailwind-scrollbar? for mobile
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>date posted</Table.HeadCell>
              <Table.HeadCell>comment</Table.HeadCell>
              <Table.HeadCell>likes</Table.HeadCell>
              <Table.HeadCell>posted by</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {allComments.map((user) => (
                <Table.Row
                  key={user._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {format(new Date(user.createdAt), "dd MMM yyyy")}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover bg-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setIdToDelete(user._id);
                      }}
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                    >
                      Delete
                    </button>
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
        <p>No users created yet!</p>
      )}

      {/* delete user modal */}
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
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

export default DashComments;
