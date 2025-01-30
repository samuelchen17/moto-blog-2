import { _get, _patch } from "@/api/axiosClient";
import { DataTable } from "../../ui/data-table";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import { ColumnDef } from "@tanstack/react-table";
import { IContactForm, IContactResponse, INotificationsCount } from "@/types";
import { format } from "date-fns";
import { Check, X, MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteModal from "@/components/DeleteModal";
import { _delete } from "@/api/axiosClient";
import { toast } from "react-toastify";
import { setNotifications } from "@/redux/features/notifications/contactNotificationSlice";

export default function DashMessages() {
  const [contactMessages, setContactMessages] = useState<IContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<"createdAt" | "email" | "read">();
  const [order, setOrder] = useState<"asc" | "desc">();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState(0);
  const [idSelected, setIdSelected] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const limit = 10;

  const dispatch = useAppDispatch();

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);

        // dynamically construct the url
        let url = `/contact/get-messages/${currentUser?.user.id}?limit=${limit}`;
        const queryParams = new URLSearchParams();

        if (sortField) queryParams.append("sort", sortField);
        if (order) queryParams.append("order", order);
        if (startIndex)
          queryParams.append("startIndex", startIndex as unknown as string);

        if (queryParams.toString()) {
          url += `&${queryParams.toString()}`;
        }

        const res = await _get<IContactForm[]>(url);
        setContactMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch contact messages:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.user.id) {
      fetchMessages();
    }
  }, [currentUser?.user.id, sortField, order, startIndex]);

  const fetchNotificationCount = async () => {
    try {
      const res = await _get<INotificationsCount>(
        `/contact/notifications/${currentUser?.user.id}`
      );
      console.log(res.data);
      dispatch(setNotifications(res.data));
    } catch (err) {
      console.error("Failed to fetch notification count:", err);
    }
  };

  const handlePagination = (direction: "next" | "prev") => {
    setStartIndex((prevIndex) =>
      direction === "next" ? prevIndex + limit : prevIndex - limit
    );
  };

  const handleDeleteMessage = async () => {
    setOpenModal(false);
    try {
      const res = await _delete<IContactResponse>(
        `/contact/delete-message/${currentUser?.user.id}/${idSelected}`
      );

      const data = res.data;

      setContactMessages((prev) =>
        prev.filter((message) => message._id !== idSelected)
      );

      toast.success(data.message);

      setIdSelected(null);
    } catch (err) {
      toast.error("Failed to delete comment");
      console.error("Error:", err);
    }
  };

  const toggleReadStatus = async (messageId: string) => {
    try {
      const res = await _patch<IContactResponse>(
        `/contact/toggle-read-status/${currentUser?.user.id}/${messageId}`
      );

      const data = res.data;

      setContactMessages((prev) =>
        prev.map((message) =>
          message._id === messageId
            ? { ...message, read: !message.read }
            : message
        )
      );

      fetchNotificationCount();
      toast.success(data.message);
    } catch (err) {
      toast.error("Failed to toggle read status");
      console.error("Error:", err);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const toggleOrder = (field: "createdAt" | "email" | "read") => {
    if (sortField === field) {
      setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      // default to asc otherwise
      setOrder("asc");
    }
  };

  const columns: ColumnDef<IContactForm>[] = [
    {
      accessorKey: "createdAt",
      header: () => {
        return (
          <Button
            variant="ghost"
            className="flex items-center justify-center w-full"
            onClick={() => toggleOrder("createdAt")}
          >
            Date
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const formattedDate = format(
          new Date(row.getValue("createdAt")),
          "dd MMM yy"
        );
        return (
          <div className="flex items-center justify-center w-full">
            {formattedDate}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: () => {
        return (
          <Button variant="ghost" onClick={() => toggleOrder("email")}>
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <div className="min-w-[250px]">{row.getValue("message")}</div>
      ),
    },
    {
      accessorKey: "read",
      header: () => {
        return (
          <Button
            variant="ghost"
            className="flex items-center justify-center w-full"
            onClick={() => toggleOrder("read")}
          >
            Read
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const readStatus = row.getValue("read");

        return (
          <div className="flex items-center justify-center w-full">
            {readStatus ? (
              <Check className="text-green-600" />
            ) : (
              <X className="text-red-600" />
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const readStatus = row.getValue("read");

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  toggleReadStatus(row.original._id);
                }}
              >
                Mark as {readStatus ? "unread" : "read"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
              <DropdownMenuItem
                onClick={() => {
                  setOpenModal(true);
                  setIdSelected(row.original._id);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={contactMessages} />
      {/* delete confirmation */}
      <DeleteModal
        open={openModal}
        close={handleClose}
        handleDelete={handleDeleteMessage}
        message="this message from our servers"
      />
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          disabled={startIndex === 0}
          onClick={() => handlePagination("prev")}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePagination("next")}
          disabled={
            contactMessages.length < startIndex ||
            contactMessages.length < limit
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
