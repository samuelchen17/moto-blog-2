import { _get } from "@/api/axiosClient";
import { DataTable } from "./data-table";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import { ColumnDef } from "@tanstack/react-table";
import { IContactForm, IContactResponse } from "@/types";
import { format } from "date-fns";
import { Check, X } from "lucide-react";

import { MoreHorizontal } from "lucide-react";

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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await _get<IContactForm[]>(
          `/contact/get-messages/${currentUser?.user.id}`
        );
        const data = res.data;

        setContactMessages(data);
      } catch (err) {
        console.error("Failed to fetch contact messages:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.user.id) {
      fetchMessages();
    }
  }, [currentUser?.user.id]);

  const handleDeleteComment = async () => {
    setOpenModal(false);
    try {
      const res = await _delete<IContactResponse>(
        `/contact/delete-message/${currentUser?.user.id}/${idToDelete}`
      );

      const data = res.data;

      toast.success(data.message);

      setIdToDelete(null);
    } catch (err) {
      toast.error("Failed to delete comment");
      console.error("Error:", err);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const columns: ColumnDef<IContactForm>[] = [
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const formattedDate = format(
          new Date(row.getValue("createdAt")),
          "d/MM/yy"
        );
        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "message",
      header: "Message",
    },
    {
      accessorKey: "read",
      header: "Read",
      cell: ({ row }) => {
        const readStatus = row.getValue("read");

        return (
          <div className="">
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
              <DropdownMenuItem onClick={() => {}}>
                Mark as {readStatus ? "unread" : "read"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenModal(true);
                  setIdToDelete(row.original._id);
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
