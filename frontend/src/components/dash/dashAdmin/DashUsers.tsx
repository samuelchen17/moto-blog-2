import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Alert, Table } from "flowbite-react";
import { IGetUser, IGetUserResponse } from "src/types";
import { format } from "date-fns";
import { FaCheck, FaTimes } from "react-icons/fa";
import { _delete, _get } from "@/api/axiosClient";
import DeleteModal from "@/components/DeleteModal";

const DashUsers = () => {
  const [allUsers, setAllUsers] = useState<IGetUser[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  useEffect(() => {
    const getUsers = async () => {
      try {
        setErrorMessage(null);
        const res = await _get<IGetUserResponse>(
          `/user/${currentUser?.user.id}`
        );
        const data = res.data;

        setAllUsers(data.users);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      } catch (err) {
        console.error("Error:", err);
        setErrorMessage("Failed to retrieve users, internal error");
      }
    };

    if (currentUser?.user.admin) {
      getUsers();
    }
  }, [currentUser?.user.id]);

  const handleShowMore = async () => {
    const startIndex = allUsers.length;
    setShowMoreLoading(true);

    try {
      setErrorMessage(null);
      const res = await _get<IGetUserResponse>(
        `/user/${currentUser?.user.id}?startIndex=${startIndex}`
      );
      const data = res.data;

      setAllUsers((prev) => [...prev, ...data.users]);
      if (data.users.length < 9) {
        setShowMore(false);
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Failed to show more, internal error");
    } finally {
      setShowMoreLoading(false);
    }
  };

  // change to handle delete user
  const handleDeleteUser = async () => {
    setOpenModal(false);
    try {
      await _delete(`/user/admin/${currentUser?.user.id}/${userIdToDelete}`);

      setAllUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));

      // implement delete alert

      setUserIdToDelete(null);
    } catch (err) {
      console.error("Error:", err);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="w-full">
      {currentUser?.user.admin && allUsers.length > 0 ? (
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
              {allUsers.map((user) => (
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
                        setUserIdToDelete(user._id);
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
              disabled={showMoreLoading}
            >
              {showMoreLoading ? "Loading..." : "Show more"}
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

      <DeleteModal
        open={openModal}
        close={handleClose}
        handleDelete={handleDeleteUser}
        message="this user from our servers"
      />
    </div>
  );
};

export default DashUsers;
