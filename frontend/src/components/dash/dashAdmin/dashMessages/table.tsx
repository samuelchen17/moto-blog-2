import { _get, _patch } from "@/api/axiosClient";
import { DataTable } from "./data-table";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import { ColumnDef } from "@tanstack/react-table";
import { IContactForm, IContactResponse } from "@/types";
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

export default function DemoPage() {
  const [contactMessages, setContactMessages] = useState<IContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<"createdAt" | "email" | "read">();
  const [order, setOrder] = useState<"asc" | "desc">();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idSelected, setIdSelected] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);

        // dynamically construct the url
        let url = `/contact/get-messages/${currentUser?.user.id}`;
        const queryParams = new URLSearchParams();

        if (sortField) queryParams.append("sort", sortField);
        if (order) queryParams.append("order", order);

        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`;
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
  }, [currentUser?.user.id, sortField]);

  const handleDeleteComment = async () => {
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

      toast.success(data.message);
    } catch (err) {
      toast.error("Failed to toggle read status");
      console.error("Error:", err);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  console.log(sortField);
  console.log(order);

  const toggleOrder = (sort: "createdAt" | "email" | "read") => {
    if (sortField === sort) {
      setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(sort);
      // default to asc otherwise
      setOrder("asc");
    }
  };

  const columns: ColumnDef<IContactForm>[] = [
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className=""
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
          "d/MM/yy"
        );
        return <div className="text-center">{formattedDate}</div>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
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
    },
    {
      accessorKey: "read",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className=""
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
          <>
            {readStatus ? (
              <Check className="text-green-600" />
            ) : (
              <X className="text-red-600" />
            )}
          </>
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
              <DropdownMenuItem>Edit</DropdownMenuItem>
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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={contactMessages} />
      <DeleteModal
        open={openModal}
        close={handleClose}
        handleDelete={handleDeleteComment}
        message="this message from our servers"
      />
    </div>
  );
}
