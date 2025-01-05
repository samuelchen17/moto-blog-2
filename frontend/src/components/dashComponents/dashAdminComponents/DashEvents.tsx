import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Alert, Button, Modal, Table } from "flowbite-react";
import { IEvent, IEventResponse } from "src/types";
import { format } from "date-fns";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

import { _delete, _get } from "@/api/axiosClient";
import AddEventModal from "@/components/AddEventModal";

const DashEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  useEffect(() => {
    const getEvents = async () => {
      try {
        setErrorMessage(null);
        const res = await _get<IEventResponse>(`/event/get-events`);
        const data = res.data;

        setEvents(data.events);
        if (data.events.length < 9) {
          setShowMore(false);
        }
      } catch (err) {
        console.error("Error:", err);
        setErrorMessage("Failed to retrieve events, internal error");
      }
    };

    if (currentUser?.user.admin) {
      getEvents();
    }
  }, [currentUser?.user.id]);

  const handleShowMore = async () => {
    const startIndex = events.length;
    try {
      setErrorMessage(null);
      const res = await _get<IEventResponse>(
        `/event/get-events&startIndex=${startIndex}`
      );
      const data = res.data;

      setEvents((prev) => [...prev, ...data.events]);
      if (data.events.length < 9) {
        setShowMore(false);
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Failed to show more, internal error");
    }
  };

  const handleDelete = async () => {
    setOpenModal(false);
    try {
      const res = await _delete(
        `/event/delete-event/${eventIdToDelete}/${currentUser?.user.id}`
      );

      const data = res.data;

      // implement delete post success message

      setEvents((prev) => prev.filter((post) => post._id !== eventIdToDelete));
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
      <AddEventModal />

      {currentUser?.user.admin && events.length > 0 ? (
        // implement tailwind-scrollbar? for mobile
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {events.map((event) => (
                <Table.Row
                  key={event._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {format(new Date(event.date), "dd MMM yyyy")}
                  </Table.Cell>
                  <Table.Cell>{event.title}</Table.Cell>
                  <Table.Cell>{event.location}</Table.Cell>
                  <Table.Cell>{event.category}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setEventIdToDelete(event._id);
                      }}
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Edit
                    </div>
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
        <p>No events created yet!</p>
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
              Are you sure you want to delete this event?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
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

export default DashEvents;
