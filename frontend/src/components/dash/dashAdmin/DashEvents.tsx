import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Alert, Table } from "flowbite-react";
import { Button as ShadButton } from "@/components/ui/button";
import { IEvent, IEventResponse } from "src/types";
import { format } from "date-fns";
import { _delete, _get } from "@/api/axiosClient";
import AddEventModal from "@/components/events/AddEventModal";
import DeleteModal from "@/components/DeleteModal";

// implement, sort by date of event rather than creation

const DashEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);
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
    setShowMoreLoading(true);
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
    } finally {
      setShowMoreLoading(false);
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

// import { _get, _delete } from "@/api/axiosClient";
// import { DataTable } from "../../ui/data-table";
// import { useCallback, useEffect, useState } from "react";
// import { useAppSelector } from "@/redux/hooks";
// import { RootState } from "@/redux/store";
// import { ColumnDef } from "@tanstack/react-table";
// import { IPostDeleteResponse, IPostResponse, IPostWithAuthor } from "@/types";
// import { format } from "date-fns";
// import { MoreHorizontal, ArrowUpDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import DeleteModal from "@/components/DeleteModal";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import HotPosts from "@/components/postComponents/HotPosts";
// import { Input } from "@/components/ui/input";
// import { debounce } from "lodash";

// import { format } from "date-fns";
// import { IEvent, IEventResponse } from "src/types";
// import AddEventModal from "@/components/events/AddEventModal";

// // implement, sort by date of event rather than creation

// const DashEvents = () => {
//   const [events, setEvents] = useState<IEvent[]>([]);
//   const [showMore, setShowMore] = useState<boolean>(true);
//   const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [openModal, setOpenModal] = useState<boolean>(false);
//   const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);
//   const { currentUser } = useAppSelector(
//     (state: RootState) => state.persisted.user
//   );

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         setErrorMessage(null);
//         const res = await _get<IEventResponse>(`/event/get-events`);
//         const data = res.data;

//         setEvents(data.events);
//         if (data.events.length < 9) {
//           setShowMore(false);
//         }
//       } catch (err) {
//         console.error("Error:", err);
//         setErrorMessage("Failed to retrieve events, internal error");
//       }
//     };

//     if (currentUser?.user.admin) {
//       getEvents();
//     }
//   }, [currentUser?.user.id]);

//   const handleShowMore = async () => {
//     const startIndex = events.length;
//     setShowMoreLoading(true);
//     try {
//       setErrorMessage(null);
//       const res = await _get<IEventResponse>(
//         `/event/get-events?startIndex=${startIndex}`
//       );
//       const data = res.data;

//       setEvents((prev) => [...prev, ...data.events]);
//       if (data.events.length < 9) {
//         setShowMore(false);
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setErrorMessage("Failed to show more, internal error");
//     } finally {
//       setShowMoreLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     setOpenModal(false);
//     try {
//       const res = await _delete(
//         `/event/delete-event/${eventIdToDelete}/${currentUser?.user.id}`
//       );

//       const data = res.data;

//       // implement delete post success message

//       setEvents((prev) => prev.filter((post) => post._id !== eventIdToDelete));
//     } catch (err) {
//       console.error("Error:", err);
//       if (err instanceof Error) {
//         setErrorMessage(err.message);
//       } else {
//         setErrorMessage("An unknown error occurred");
//       }
//     }
//   };

//   const handleClose = () => {
//     setOpenModal(false);
//   };

//   const columns: ColumnDef<IPostWithAuthor>[] = [
//     {
//       accessorKey: "createdAt",
//       header: () => {
//         return (
//           <Button
//             variant="ghost"
//             className="flex items-center justify-center w-full"
//             onClick={() => toggleOrder("createdAt")}
//           >
//             Date
//             <ArrowUpDown />
//           </Button>
//         );
//       },
//       cell: ({ row }) => {
//         const formattedDate = format(
//           new Date(row.getValue("createdAt")),
//           "dd MMM yy"
//         );
//         return (
//           <div className="flex items-center justify-center w-full">
//             {formattedDate}
//           </div>
//         );
//       },
//     },
//     {
//       accessorKey: "title",
//       header: () => {
//         return (
//           <Button
//             className="flex items-center justify-center w-full"
//             variant="ghost"
//             onClick={() => toggleOrder("title")}
//           >
//             Title
//             <ArrowUpDown />
//           </Button>
//         );
//       },
//       cell: ({ row }) => (
//         <div className="lowercase">{row.getValue("title")}</div>
//       ),
//     }, {
//       accessorKey: "location",
//       header: "Location"
//     },
//     {
//       accessorKey: "category",
//       header: () => {
//         return (
//           <Button
//             className="flex items-center justify-center w-full"
//             variant="ghost"
//             onClick={() => toggleOrder("category")}
//           >
//             Category
//             <ArrowUpDown />
//           </Button>
//         );
//       },
//       cell: ({ row }) => (
//         <div className="flex items-center justify-center w-full">
//           {row.getValue("category")}
//         </div>
//       ),
//     },
//     {
//       id: "actions",
//       cell: ({ row }) => {
//         return (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <span className="sr-only">Open menu</span>
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//               <DropdownMenuItem>
//                 <Link
//                   to={`/dashboard/?tab=update-post/${row.original._id}`}
//                   className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
//                 >
//                   Edit
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 className="font-medium text-red-600 hover:underline dark:text-red-500"
//                 onClick={() => {
//                   setOpenModal(true);
//                   setIdSelected(row.original._id);
//                 }}
//               >
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         );
//       },
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="container mx-auto py-10">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full flex gap-6 flex-col">

//       {currentUser?.user.admin && events.length > 0 ? (
//         // implement tailwind-scrollbar? for mobile
//         <div className="overflow-x-auto">
//           <Table hoverable>
//             <Table.Head>
//               <Table.HeadCell>Date</Table.HeadCell>
//               <Table.HeadCell>Title</Table.HeadCell>
//               <Table.HeadCell>Location</Table.HeadCell>
//               <Table.HeadCell>Category</Table.HeadCell>
//               <Table.HeadCell>
//                 <span className="sr-only">Delete</span>
//               </Table.HeadCell>
//               <Table.HeadCell>
//                 <span className="sr-only">Edit</span>
//               </Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y">
//               {events.map((event) => (
//                 <Table.Row
//                   key={event._id}
//                   className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                 >
//                   <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//                     {format(new Date(event.date), "dd MMM yyyy")}
//                   </Table.Cell>
//                   <Table.Cell>{event.title}</Table.Cell>
//                   <Table.Cell>{event.location}</Table.Cell>
//                   <Table.Cell>{event.category}</Table.Cell>
//                   <Table.Cell>
//                     <button
//                       onClick={() => {
//                         setOpenModal(true);
//                         setEventIdToDelete(event._id);
//                       }}
//                       className="font-medium text-red-600 hover:underline dark:text-red-500"
//                     >
//                       Delete
//                     </button>
//                   </Table.Cell>
//                   <Table.Cell>

//                   </Table.Cell>
//                 </Table.Row>
//               ))}
//             </Table.Body>
//           </Table>
//           {showMore && (
//             // implement style button
//             <button
//               onClick={handleShowMore}
//               className="self-center w-full text-red-500 py-6"
//               disabled={showMoreLoading}
//             >
//               {showMoreLoading ? "Loading..." : "Show more"}
//             </button>
//           )}
//           {errorMessage && (
//             <Alert
//               color="failure"
//               className="text-center justify-center items-center"
//             >
//               {errorMessage}
//             </Alert>
//           )}
//         </div>
//       ) : (
//         <p>No events created yet!</p>
//       )}

//     </div>
//   );
// };

// export default DashEvents;

// // add event
// <AddEventModal setEvents={setEvents}>
//         <Button className="mr-auto">Create event</Button>
//       </AddEventModal>

// // edit event
// <AddEventModal
// setEvents={setEvents}
// eventToBeEdited={event}
// >
// <div className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
//   Edit
// </div>
// </AddEventModal>

// // delete modal
// <DeleteModal
// open={openModal}
// close={handleClose}
// handleDelete={handleDelete}
// message="this event from our servers"
// />
