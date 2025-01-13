import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Alert, Table } from "flowbite-react";
import { format } from "date-fns";

import { IComment, IAllCommentResponse } from "src/types";
import { _delete, _get } from "@/api/axiosClient";
import DeleteModal from "@/components/DeleteModal";

// implement accordion for post and comments

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
    const getComments = async () => {
      try {
        setErrorMessage(null);
        const res = await _get<IAllCommentResponse>(
          `/comment/getallcomments/${currentUser?.user.id}`
        );
        const data = res.data;

        setAllComments(data.comments);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      } catch (err) {
        console.error("Error:", err);
        setErrorMessage("Failed to retrieve comments, internal error");
      }
    };

    if (currentUser?.user.admin) {
      getComments();
    }
  }, [currentUser?.user.id]);

  const handleShowMore = async () => {
    const startIndex = allComments.length;
    try {
      setErrorMessage(null);
      const res = await _get<IAllCommentResponse>(
        `/comment/getallcomments/${currentUser?.user.id}?startIndex=${startIndex}`
      );
      const data = res.data;

      setAllComments((prev) => [...prev, ...data.comments]);
      if (data.comments.length < 9) {
        setShowMore(false);
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Failed to show more, internal error");
    }
  };

  // change to handle delete user
  const handleDeleteComment = async () => {
    setOpenModal(false);
    try {
      const res = await _delete(
        `/comment/delete/${idToDelete}/${currentUser?.user.id}`
      );

      const data = res.data;

      // implement delete alert

      setAllComments((prev) =>
        prev.filter((comment) => comment._id !== idToDelete)
      );

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

  const handleClose = () => {
    setOpenModal(false);
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
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {allComments.map((comment) => (
                <Table.Row
                  key={comment._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {format(new Date(comment.updatedAt), "dd MMM yyyy")}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.likes}</Table.Cell>
                  <Table.Cell>{comment.commentBy}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setIdToDelete(comment._id);
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
        <p className="">No comments created yet!</p>
      )}

      <DeleteModal
        open={openModal}
        close={handleClose}
        handleDelete={handleDeleteComment}
        message="this comment from our servers"
      />
    </div>
  );
};

export default DashComments;
