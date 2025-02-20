// import { useEffect, useState } from "react";
// import { useAppSelector } from "../../../redux/hooks";
// import { RootState } from "../../../redux/store";
// import { Alert, Table } from "flowbite-react";
// import { IGetUser, IGetUserResponse } from "src/types";
// import { format } from "date-fns";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import { _delete, _get } from "@/api/axiosClient";
// import DeleteModal from "@/components/DeleteModal";

// const DashOld = () => {
//   const [allUsers, setAllUsers] = useState<IGetUser[]>([]);
//   const [showMore, setShowMore] = useState<boolean>(true);
//   const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [openModal, setOpenModal] = useState<boolean>(false);
//   const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
//   const { currentUser } = useAppSelector(
//     (state: RootState) => state.persisted.user
//   );

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         setErrorMessage(null);
//         const res = await _get<IGetUserResponse>(
//           `/user/${currentUser?.user.id}`
//         );
//         const data = res.data;

//         setAllUsers(data.users);
//         if (data.users.length < 9) {
//           setShowMore(false);
//         }
//       } catch (err) {
//         console.error("Error:", err);
//         setErrorMessage("Failed to retrieve users, internal error");
//       }
//     };

//     if (currentUser?.user.admin) {
//       getUsers();
//     }
//   }, [currentUser?.user.id]);

//   const handleShowMore = async () => {
//     const startIndex = allUsers.length;
//     setShowMoreLoading(true);

//     try {
//       setErrorMessage(null);
//       const res = await _get<IGetUserResponse>(
//         `/user/${currentUser?.user.id}?startIndex=${startIndex}`
//       );
//       const data = res.data;

//       setAllUsers((prev) => [...prev, ...data.users]);
//       if (data.users.length < 9) {
//         setShowMore(false);
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setErrorMessage("Failed to show more, internal error");
//     } finally {
//       setShowMoreLoading(false);
//     }
//   };

//   // change to handle delete user
//   const handleDeleteUser = async () => {
//     setOpenModal(false);
//     try {
//       await _delete(`/user/admin/${currentUser?.user.id}/${userIdToDelete}`);

//       setAllUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));

//       // implement delete alert

//       setUserIdToDelete(null);
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

//   return (
//     <div className="w-full">
//       {currentUser?.user.admin && allUsers.length > 0 ? (
//         // implement tailwind-scrollbar? for mobile
//         <div className="overflow-x-auto">
//           <Table hoverable>
//             <Table.Head>
//               <Table.HeadCell>Date Joined</Table.HeadCell>
//               <Table.HeadCell>Profile image</Table.HeadCell>
//               <Table.HeadCell>Username</Table.HeadCell>
//               <Table.HeadCell>Email</Table.HeadCell>
//               <Table.HeadCell>Admin</Table.HeadCell>
//               <Table.HeadCell>
//                 <span className="sr-only">Delete</span>
//               </Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y">
//               {allUsers.map((user) => (
//                 <Table.Row
//                   key={user._id}
//                   className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                 >
//                   <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//                     {format(new Date(user.createdAt), "dd MMM yyyy")}
//                   </Table.Cell>
//                   <Table.Cell>
//                     <img
//                       src={user.profilePicture}
//                       alt={user.username}
//                       className="w-10 h-10 rounded-full object-cover bg-gray-500"
//                     />
//                   </Table.Cell>
//                   <Table.Cell>{user.username}</Table.Cell>
//                   <Table.Cell>{user.email}</Table.Cell>
//                   <Table.Cell>
//                     {user.isAdmin ? (
//                       <FaCheck className="text-green-500" />
//                     ) : (
//                       <FaTimes className="text-red-500" />
//                     )}
//                   </Table.Cell>
//                   <Table.Cell>
//                     <button
//                       onClick={() => {
//                         setOpenModal(true);
//                         setUserIdToDelete(user._id);
//                       }}
//                       className="font-medium text-red-600 hover:underline dark:text-red-500"
//                     >
//                       Delete
//                     </button>
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
//         <p>No users created yet!</p>
//       )}

//       <DeleteModal
//         open={openModal}
//         close={handleClose}
//         handleDelete={handleDeleteUser}
//         message="this user from our servers"
//       />
//     </div>
//   );
// };

// export default DashOld;

// // import { useEffect, useState } from "react";
// // import { useAppSelector } from "../../../redux/hooks";
// // import { RootState } from "../../../redux/store";
// // import { Alert } from "flowbite-react";
// // import { format } from "date-fns";
// // import { IComment, IAllCommentResponse } from "src/types";
// // import { _delete, _get } from "@/api/axiosClient";
// // import DeleteModal from "@/components/DeleteModal";

// // import {
// //   Table,
// //   TableBody,
// //   TableCaption,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import { toast } from "react-toastify";

// // // implement accordion for post and comments

// // const DashComments = () => {
// //   const [allComments, setAllComments] = useState<IComment[]>([]);
// //   const [showMore, setShowMore] = useState<boolean>(true);
// //   const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);
// //   const [errorMessage, setErrorMessage] = useState<string | null>(null);
// //   const [openModal, setOpenModal] = useState<boolean>(false);
// //   const [idToDelete, setIdToDelete] = useState<string | null>(null);
// //   const { currentUser } = useAppSelector(
// //     (state: RootState) => state.persisted.user
// //   );

// //   useEffect(() => {
// //     const getComments = async () => {
// //       try {
// //         setErrorMessage(null);
// //         const res = await _get<IAllCommentResponse>(
// //           `/comment/get-all-comments/${currentUser?.user.id}`
// //         );
// //         const data = res.data;

// //         setAllComments(data.comments);
// //         if (data.comments.length < 9) {
// //           setShowMore(false);
// //         }
// //       } catch (err) {
// //         console.error("Error:", err);
// //         setErrorMessage("Failed to retrieve comments, internal error");
// //       }
// //     };

// //     if (currentUser?.user.admin) {
// //       getComments();
// //     }
// //   }, [currentUser?.user.id]);

// //   const handleShowMore = async () => {
// //     const startIndex = allComments.length;
// //     setShowMoreLoading(true);
// //     try {
// //       setErrorMessage(null);
// //       const res = await _get<IAllCommentResponse>(
// //         `/comment/get-all-comments/${currentUser?.user.id}?startIndex=${startIndex}`
// //       );
// //       const data = res.data;

// //       setAllComments((prev) => [...prev, ...data.comments]);
// //       if (data.comments.length < 9) {
// //         setShowMore(false);
// //       }
// //     } catch (err) {
// //       console.error("Error:", err);
// //       setErrorMessage("Failed to show more, internal error");
// //     } finally {
// //       setShowMoreLoading(false);
// //     }
// //   };

// //   // change to handle delete user
// //   const handleDeleteComment = async () => {
// //     setOpenModal(false);
// //     try {
// //       await _delete(`/comment/delete/${idToDelete}/${currentUser?.user.id}`);

// //       toast.success("Comment deleted");

// //       setAllComments((prev) =>
// //         prev.filter((comment) => comment._id !== idToDelete)
// //       );

// //       setIdToDelete(null);
// //     } catch (err) {
// //       toast.error("Failed to delete comment");
// //       console.error("Error:", err);
// //       if (err instanceof Error) {
// //         setErrorMessage(err.message);
// //       } else {
// //         setErrorMessage("An unknown error occurred");
// //       }
// //     }
// //   };

// //   const handleClose = () => {
// //     setOpenModal(false);
// //   };

// //   return (
// //     <div className="w-full">
// //       {currentUser?.user.admin && allComments.length > 0 ? (
// //         // implement tailwind-scrollbar? for mobile
// //         <div className="overflow-x-auto">
// //           <Table>
// //             <TableCaption className="mb-6">
// //               A list of all comments by post
// //             </TableCaption>
// //             <TableHeader>
// //               <TableRow>
// //                 <TableHead>Date posted</TableHead>
// //                 <TableHead>Comment</TableHead>
// //                 <TableHead>Likes</TableHead>
// //                 <TableHead>Posted by</TableHead>
// //                 <TableHead>
// //                   <span className="sr-only">Delete</span>
// //                 </TableHead>
// //               </TableRow>
// //             </TableHeader>
// //             <TableBody className="divide-y">
// //               {allComments.map((comment) => (
// //                 <TableRow key={comment._id}>
// //                   <TableCell className="whitespace-nowrap font-medium">
// //                     {format(new Date(comment.updatedAt), "dd MMM yyyy")}
// //                   </TableCell>
// //                   <TableCell>{comment.content}</TableCell>
// //                   <TableCell>{comment.likes.length}</TableCell>
// //                   <TableCell>{comment.commentBy}</TableCell>
// //                   <TableCell>
// //                     <button
// //                       onClick={() => {
// //                         setOpenModal(true);
// //                         setIdToDelete(comment._id);
// //                       }}
// //                       className="font-medium text-red-600 hover:underline dark:text-red-500"
// //                     >
// //                       Delete
// //                     </button>
// //                   </TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //           {showMore && (
// //             // implement style button
// //             <button
// //               onClick={handleShowMore}
// //               className="self-center w-full text-red-500 py-6"
// //               disabled={showMoreLoading}
// //             >
// //               {showMoreLoading ? "Loading..." : "Show more"}
// //             </button>
// //           )}
// //           {errorMessage && (
// //             <Alert
// //               color="failure"
// //               className="text-center justify-center items-center"
// //             >
// //               {errorMessage}
// //             </Alert>
// //           )}
// //         </div>
// //       ) : (
// //         <p className="">No comments created yet!</p>
// //       )}

// //       <DeleteModal
// //         open={openModal}
// //         close={handleClose}
// //         handleDelete={handleDeleteComment}
// //         message="this comment from our servers"
// //       />
// //     </div>
// //   );
// // };

// // export default DashComments;

// // import { useEffect, useState } from "react";
// // import { useAppSelector } from "../../../redux/hooks";
// // import { RootState } from "../../../redux/store";
// // import { Alert, Table } from "flowbite-react";
// // import { Button as ShadButton } from "@/components/ui/button";
// // import { IEvent, IEventResponse } from "src/types";
// // import { format } from "date-fns";
// // import { _delete, _get } from "@/api/axiosClient";
// // import AddEventModal from "@/components/events/AddEventModal";
// // import DeleteModal from "@/components/DeleteModal";

// // // implement, sort by date of event rather than creation

// // const DashOld = () => {
// //   const [events, setEvents] = useState<IEvent[]>([]);
// //   const [showMore, setShowMore] = useState<boolean>(true);
// //   const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);
// //   const [errorMessage, setErrorMessage] = useState<string | null>(null);
// //   const [openModal, setOpenModal] = useState<boolean>(false);
// //   const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);
// //   const { currentUser } = useAppSelector(
// //     (state: RootState) => state.persisted.user
// //   );

// //   useEffect(() => {
// //     const getEvents = async () => {
// //       try {
// //         setErrorMessage(null);
// //         const res = await _get<IEventResponse>(`/event/get-events`);
// //         const data = res.data;

// //         setEvents(data.events);
// //         if (data.events.length < 9) {
// //           setShowMore(false);
// //         }
// //       } catch (err) {
// //         console.error("Error:", err);
// //         setErrorMessage("Failed to retrieve events, internal error");
// //       }
// //     };

// //     if (currentUser?.user.admin) {
// //       getEvents();
// //     }
// //   }, [currentUser?.user.id]);

// //   const handleShowMore = async () => {
// //     const startIndex = events.length;
// //     setShowMoreLoading(true);
// //     try {
// //       setErrorMessage(null);
// //       const res = await _get<IEventResponse>(
// //         `/event/get-events?startIndex=${startIndex}`
// //       );
// //       const data = res.data;

// //       setEvents((prev) => [...prev, ...data.events]);
// //       if (data.events.length < 9) {
// //         setShowMore(false);
// //       }
// //     } catch (err) {
// //       console.error("Error:", err);
// //       setErrorMessage("Failed to show more, internal error");
// //     } finally {
// //       setShowMoreLoading(false);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     setOpenModal(false);
// //     try {
// //       const res = await _delete(
// //         `/event/delete-event/${eventIdToDelete}/${currentUser?.user.id}`
// //       );

// //       const data = res.data;

// //       // implement delete post success message

// //       setEvents((prev) => prev.filter((post) => post._id !== eventIdToDelete));
// //     } catch (err) {
// //       console.error("Error:", err);
// //       if (err instanceof Error) {
// //         setErrorMessage(err.message);
// //       } else {
// //         setErrorMessage("An unknown error occurred");
// //       }
// //     }
// //   };

// //   const handleClose = () => {
// //     setOpenModal(false);
// //   };

// //   return (
// //     <div className="w-full flex gap-6 flex-col">
// //       <AddEventModal setEvents={setEvents}>
// //         <ShadButton className="mr-auto">Create event</ShadButton>
// //       </AddEventModal>

// //       {currentUser?.user.admin && events.length > 0 ? (
// //         // implement tailwind-scrollbar? for mobile
// //         <div className="overflow-x-auto">
// //           <Table hoverable>
// //             <Table.Head>
// //               <Table.HeadCell>Date</Table.HeadCell>
// //               <Table.HeadCell>Title</Table.HeadCell>
// //               <Table.HeadCell>Location</Table.HeadCell>
// //               <Table.HeadCell>Category</Table.HeadCell>
// //               <Table.HeadCell>
// //                 <span className="sr-only">Delete</span>
// //               </Table.HeadCell>
// //               <Table.HeadCell>
// //                 <span className="sr-only">Edit</span>
// //               </Table.HeadCell>
// //             </Table.Head>
// //             <Table.Body className="divide-y">
// //               {events.map((event) => (
// //                 <Table.Row
// //                   key={event._id}
// //                   className="bg-white dark:border-gray-700 dark:bg-gray-800"
// //                 >
// //                   <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
// //                     {format(new Date(event.date), "dd MMM yyyy")}
// //                   </Table.Cell>
// //                   <Table.Cell>{event.title}</Table.Cell>
// //                   <Table.Cell>{event.location}</Table.Cell>
// //                   <Table.Cell>{event.category}</Table.Cell>
// //                   <Table.Cell>
// //                     <button
// //                       onClick={() => {
// //                         setOpenModal(true);
// //                         setEventIdToDelete(event._id);
// //                       }}
// //                       className="font-medium text-red-600 hover:underline dark:text-red-500"
// //                     >
// //                       Delete
// //                     </button>
// //                   </Table.Cell>
// //                   <Table.Cell>
// //                     <AddEventModal
// //                       setEvents={setEvents}
// //                       eventToBeEdited={event}
// //                     >
// //                       <div className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
// //                         Edit
// //                       </div>
// //                     </AddEventModal>
// //                   </Table.Cell>
// //                 </Table.Row>
// //               ))}
// //             </Table.Body>
// //           </Table>
// //           {showMore && (
// //             // implement style button
// //             <button
// //               onClick={handleShowMore}
// //               className="self-center w-full text-red-500 py-6"
// //               disabled={showMoreLoading}
// //             >
// //               {showMoreLoading ? "Loading..." : "Show more"}
// //             </button>
// //           )}
// //           {errorMessage && (
// //             <Alert
// //               color="failure"
// //               className="text-center justify-center items-center"
// //             >
// //               {errorMessage}
// //             </Alert>
// //           )}
// //         </div>
// //       ) : (
// //         <p>No events created yet!</p>
// //       )}

// //       <DeleteModal
// //         open={openModal}
// //         close={handleClose}
// //         handleDelete={handleDelete}
// //         message="this event from our servers"
// //       />
// //     </div>
// //   );
// // };

// // export default DashOld;

// // import { useEffect, useState } from "react";
// // import { useAppSelector } from "../../../redux/hooks";
// // import { RootState } from "../../../redux/store";
// // import { Alert, Table } from "flowbite-react";
// // import { IPostResponse, IPostWithAuthor } from "src/types";
// // import { format } from "date-fns";
// // import { Link } from "react-router-dom";

// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { _delete, _get } from "@/api/axiosClient";
// // import DeleteModal from "@/components/DeleteModal";

// // const DashOld = () => {
// //   const [userAdminPosts, setUserAdminPosts] = useState<IPostWithAuthor[]>([]);
// //   const [showMore, setShowMore] = useState<boolean>(true);
// //   const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);
// //   const [errorMessage, setErrorMessage] = useState<string | null>(null);
// //   const [openModal, setOpenModal] = useState<boolean>(false);
// //   const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
// //   const { currentUser } = useAppSelector(
// //     (state: RootState) => state.persisted.user
// //   );

// //   // implement accordion so user doesnt have to scrolls
// //   // Dropdown to select hot posts, could change to algorithm based on interactivity with users?

// //   useEffect(() => {
// //     const getPosts = async () => {
// //       try {
// //         setErrorMessage(null);
// //         const res = await _get<IPostResponse>(
// //           `/post/getposts?createdBy=${currentUser?.user.id}`
// //         );
// //         const data = res.data;

// //         setUserAdminPosts(data.posts);
// //         if (data.posts.length < 9) {
// //           setShowMore(false);
// //         }
// //       } catch (err) {
// //         console.error("Error:", err);
// //         setErrorMessage("Failed to retrieve posts, internal error");
// //       }
// //     };

// //     if (currentUser?.user.admin) {
// //       getPosts();
// //     }
// //   }, [currentUser?.user.id]);

// //   const handleShowMore = async () => {
// //     const startIndex = userAdminPosts.length;
// //     setShowMoreLoading(true);
// //     try {
// //       setErrorMessage(null);
// //       const res = await _get<IPostResponse>(
// //         `/post/getposts?createdBy=${currentUser?.user.id}&startIndex=${startIndex}`
// //       );
// //       const data = res.data;

// //       setUserAdminPosts((prev) => [...prev, ...data.posts]);
// //       if (data.posts.length < 9) {
// //         setShowMore(false);
// //       }
// //     } catch (err) {
// //       console.error("Error:", err);
// //       setErrorMessage("Failed to show more, internal error");
// //     } finally {
// //       setShowMoreLoading(false);
// //     }
// //   };

// //   const handleDeletePost = async () => {
// //     setOpenModal(false);
// //     try {
// //       const res = await _delete(
// //         `/post/delete/${postIdToDelete}/${currentUser?.user.id}`
// //       );

// //       const data = res.data;

// //       // implement delete post success message

// //       setUserAdminPosts((prev) =>
// //         prev.filter((post) => post._id !== postIdToDelete)
// //       );
// //     } catch (err) {
// //       console.error("Error:", err);
// //       if (err instanceof Error) {
// //         setErrorMessage(err.message);
// //       } else {
// //         setErrorMessage("An unknown error occurred");
// //       }
// //     }
// //   };

// //   const handleClose = () => {
// //     setOpenModal(false);
// //   };

// //   return (
// //     <div className="w-full">
// //       {/* implement select hotpost section */}
// //       <span>Hot Post Selection</span>
// //       <form>
// //         <span>Post 1</span>
// //         <Select>
// //           <SelectTrigger className="w-[180px]">
// //             <SelectValue placeholder="Select Post" />
// //           </SelectTrigger>
// //           <SelectContent>
// //             {userAdminPosts.map((post) => (
// //               <SelectItem key={post._id} value={post._id}>
// //                 {post.slug}
// //               </SelectItem>
// //             ))}
// //           </SelectContent>
// //         </Select>
// //       </form>

// //       {currentUser?.user.admin && userAdminPosts.length > 0 ? (
// //         // implement tailwind-scrollbar? for mobile
// //         <div className="overflow-x-auto">
// //           <Table hoverable>
// //             <Table.Head>
// //               <Table.HeadCell>Date updated</Table.HeadCell>
// //               <Table.HeadCell>Image</Table.HeadCell>
// //               <Table.HeadCell>Title</Table.HeadCell>
// //               <Table.HeadCell>Category</Table.HeadCell>
// //               <Table.HeadCell>
// //                 <span className="sr-only">Delete</span>
// //               </Table.HeadCell>
// //               <Table.HeadCell>
// //                 <span className="sr-only">Edit</span>
// //               </Table.HeadCell>
// //             </Table.Head>
// //             <Table.Body className="divide-y">
// //               {userAdminPosts.map((post) => (
// //                 <Table.Row
// //                   key={post.slug}
// //                   className="bg-white dark:border-gray-700 dark:bg-gray-800"
// //                 >
// //                   <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
// //                     {format(new Date(post.updatedAt), "dd MMM yyyy")}
// //                   </Table.Cell>
// //                   <Table.Cell>
// //                     <Link to={`/blogs/post/${post.slug}`}>
// //                       <img
// //                         src={post.image}
// //                         alt={post.title}
// //                         className="w-20 h-10 object-cover bg-gray-500"
// //                       />
// //                     </Link>
// //                   </Table.Cell>
// //                   <Table.Cell>
// //                     <Link to={`/blogs/post/${post.slug}`}>{post.title}</Link>
// //                   </Table.Cell>
// //                   <Table.Cell>{post.category}</Table.Cell>
// //                   <Table.Cell>
// //                     <button
// //                       onClick={() => {
// //                         setOpenModal(true);
// //                         setPostIdToDelete(post._id);
// //                       }}
// //                       className="font-medium text-red-600 hover:underline dark:text-red-500"
// //                     >
// //                       Delete
// //                     </button>
// //                   </Table.Cell>
// //                   <Table.Cell>
// //                     <Link
// //                       // to={`/update-post/${post._id}`}
// //                       to={`/dashboard/?tab=update-post/${post._id}`}
// //                       className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
// //                     >
// //                       Edit
// //                     </Link>
// //                   </Table.Cell>
// //                 </Table.Row>
// //               ))}
// //             </Table.Body>
// //           </Table>
// //           {showMore && (
// //             // implement style button
// //             <button
// //               onClick={handleShowMore}
// //               className="self-center w-full text-red-500 py-6"
// //               disabled={showMoreLoading}
// //             >
// //               {showMoreLoading ? "Loading..." : "Show more"}
// //             </button>
// //           )}
// //           {errorMessage && (
// //             <Alert
// //               color="failure"
// //               className="text-center justify-center items-center"
// //             >
// //               {errorMessage}
// //             </Alert>
// //           )}
// //         </div>
// //       ) : (
// //         <p>No posts created yet!</p>
// //       )}

// //       <DeleteModal
// //         open={openModal}
// //         close={handleClose}
// //         handleDelete={handleDeletePost}
// //         message="this post from our servers"
// //       />
// //     </div>
// //   );
// // };

// // export default DashOld;
