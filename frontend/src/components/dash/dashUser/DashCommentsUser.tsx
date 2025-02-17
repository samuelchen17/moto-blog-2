import { _get, _patch, _delete } from "@/api/axiosClient";
import { DataTable } from "../../ui/data-table";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ColumnDef } from "@tanstack/react-table";
import { IComment, ICommentResponse } from "@/types";
import { format } from "date-fns";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteModal from "@/components/DeleteModal";
import { toast } from "react-toastify";

// only re render the rows, not the entire table, implement

export function DashCommentsUserTable() {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<"createdAt" | "numberOfLikes">();
  const [order, setOrder] = useState<"asc" | "desc">();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState(0);
  const [idSelected, setIdSelected] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const limit = 10;

  // fetch user comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);

        // dynamically construct the url
        let url = `/comment/get-user-comments/${currentUser?.user.id}?limit=${limit}`;
        const queryParams = new URLSearchParams();

        if (sortField) queryParams.append("sort", sortField);
        if (order) queryParams.append("order", order);
        if (startIndex)
          queryParams.append("startIndex", startIndex as unknown as string);

        if (queryParams.toString()) {
          url += `&${queryParams.toString()}`;
        }

        const res = await _get<ICommentResponse>(url);
        setComments(res.data.comments);
      } catch (err) {
        console.error("Error:", err);
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.user.id) {
      fetchComments();
    }
  }, [currentUser?.user.id, sortField, order, startIndex]);

  const handlePagination = (direction: "next" | "prev") => {
    setStartIndex((prevIndex) =>
      direction === "next" ? prevIndex + limit : prevIndex - limit
    );
  };

  const handleDeleteComment = async () => {
    setOpenModal(false);
    try {
      const res = await _delete<any>(
        `/comment/delete/${idSelected}/${currentUser?.user.id}`
      );

      setComments((prev) =>
        prev.filter((comment) => comment._id !== idSelected)
      );

      //   toast.success("Comment deleted");
      toast.success(res.data.message);
    } catch (err) {
      console.error("Error:", err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIdSelected(null);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const toggleOrder = (field: "createdAt" | "numberOfLikes") => {
    if (sortField === field) {
      setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      // default to asc otherwise
      setOrder("asc");
    }
  };

  const columns: ColumnDef<IComment>[] = [
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
      accessorKey: "content",
      header: () => {
        return (
          <div className="flex items-center justify-center w-full">Comment</div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("content")}</div>
      ),
    },

    {
      accessorKey: "postId",
      header: () => {
        return (
          <div className="flex items-center justify-center w-full">Post Id</div>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center justify-center w-full">
          {row.getValue("postId")}
        </div>
      ),
    },
    {
      accessorKey: "numberOfLikes",
      header: () => {
        return (
          <Button
            className="flex items-center justify-center w-full"
            variant="ghost"
            onClick={() => toggleOrder("numberOfLikes")}
          >
            Likes
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center justify-center w-full">
          {row.getValue("numberOfLikes")}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
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
                className="font-medium text-red-600 hover:underline dark:text-red-500"
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
      <DataTable columns={columns} data={comments} />
      {/* delete confirmation */}
      <DeleteModal
        open={openModal}
        close={handleClose}
        handleDelete={handleDeleteComment}
        message="this comment from our servers"
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
          disabled={comments.length < startIndex || comments.length < limit}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const DashCommentsUser = () => {
  return (
    <div>
      <DashCommentsUserTable />
    </div>
  );
};

export default DashCommentsUser;
