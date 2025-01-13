import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Alert, Table } from "flowbite-react";
import { Button as ShadButton } from "@/components/ui/button";
import { IEvent, IEventResponse } from "src/types";
import { format } from "date-fns";
import { _delete, _get } from "@/api/axiosClient";
import AddEventModal from "@/components/AddEventModal";
import DeleteModal from "@/components/DeleteModal";

// implement, sort by date of event rather than creation

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
        `/event/get-events?startIndex=${startIndex}`
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

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="w-full flex gap-6 flex-col">
      <AddEventModal setEvents={setEvents}>
        <ShadButton className="mr-auto">Create event</ShadButton>
      </AddEventModal>

      {currentUser?.user.admin && events.length > 0 ? (
        // implement tailwind-scrollbar? for mobile
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
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
                    <AddEventModal
                      setEvents={setEvents}
                      eventToBeEdited={event}
                    >
                      <div className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Edit
                      </div>
                    </AddEventModal>
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

      <DeleteModal
        open={openModal}
        close={handleClose}
        handleDelete={handleDelete}
        message="this event from our servers"
      />
    </div>
  );
};

export default DashEvents;
