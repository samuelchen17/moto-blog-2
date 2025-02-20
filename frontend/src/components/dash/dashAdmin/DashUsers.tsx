import { _get, _patch, _delete } from "@/api/axiosClient";
import { DataTable } from "../../ui/data-table";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ColumnDef } from "@tanstack/react-table";
import { IGetUser, IGetUserResponse } from "@/types";
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
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import DashOld from "./DashOld";

// only re render the rows, not the entire table, implement

export function DashUsersTable() {
  const [users, setUsers] = useState<IGetUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<
    "createdAt" | "username" | "email" | "isAdmin"
  >();
  const [order, setOrder] = useState<"asc" | "desc">();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [idSelected, setIdSelected] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const limit = 10;

  // fetch posts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        // dynamically construct the url
        let url = `/user/${currentUser?.user.id}?limit=${limit}`;
        const queryParams = new URLSearchParams();

        if (sortField) queryParams.append("sort", sortField);
        if (order) queryParams.append("order", order);
        if (searchTerm) queryParams.append("searchTerm", searchTerm);
        if (startIndex)
          queryParams.append("startIndex", startIndex as unknown as string);

        if (queryParams.toString()) {
          url += `&${queryParams.toString()}`;
        }

        const res = await _get<IGetUserResponse>(url);
        setUsers(res.data.users);
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
      fetchUsers();
    }
  }, [currentUser?.user.id, sortField, order, startIndex, searchTerm]);

  const handlePagination = (direction: "next" | "prev") => {
    setStartIndex((prevIndex) =>
      direction === "next" ? prevIndex + limit : prevIndex - limit
    );
  };

  const handleDeleteUser = async () => {
    setOpenModal(false);
    try {
      const res = await _delete(
        `/user/admin/${currentUser?.user.id}/${idSelected}`
      );

      const data: any = res.data;

      setUsers((prev) => prev.filter((user) => user._id !== idSelected));

      toast.success(data.message);
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

  const toggleOrder = (
    field: "createdAt" | "username" | "email" | "isAdmin"
  ) => {
    if (sortField === field) {
      setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      // default to asc otherwise
      setOrder("asc");
    }
  };

  // debounce to reduce unnecessary api calls
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchTerm(query);
    }, 750),
    []
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const columns: ColumnDef<IGetUser>[] = [
    {
      accessorKey: "createdAt",
      header: () => {
        return (
          <Button
            variant="ghost"
            className="flex items-center justify-center w-full"
            onClick={() => toggleOrder("createdAt")}
          >
            Date Joined
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
      accessorKey: "profilePicture",
      header: () => {
        return (
          <div className="flex items-center justify-center w-full">
            Profile Picture
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          // <Link to={`/blogs/post/${row.original.slug}`}>
          <img
            src={row.original.profilePicture}
            alt={row.original.username}
            className="w-10 h-10 rounded-full object-cover bg-gray-500"
          />
          // </Link>
        );
      },
    },
    {
      accessorKey: "username",
      header: () => {
        return (
          <Button
            className="flex items-center justify-center w-full"
            variant="ghost"
            onClick={() => toggleOrder("username")}
          >
            Username
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("username")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: () => {
        return (
          <Button
            className="flex items-center justify-center w-full"
            variant="ghost"
            onClick={() => toggleOrder("email")}
          >
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center justify-center w-full">
          {row.getValue("email")}
        </div>
      ),
    },
    {
      accessorKey: "isAdmin",
      header: () => {
        return (
          <Button
            className="flex items-center justify-center w-full"
            variant="ghost"
            onClick={() => toggleOrder("isAdmin")}
          >
            Admin
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center justify-center w-full">
          {row.getValue("isAdmin")}
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
      <DataTable columns={columns} data={users}>
        {/* implement filtering? or search */}
        <Input
          placeholder="Filter by title..."
          className="max-w-sm"
          onChange={handleOnChange}
          value={searchTerm}
        />
      </DataTable>
      {/* delete confirmation */}
      <DeleteModal
        open={openModal}
        close={handleClose}
        handleDelete={handleDeleteUser}
        message="this post from our servers"
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
          disabled={users.length < startIndex || users.length < limit}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const DashUsers = () => {
  return (
    <div>
      <DashUsersTable />
      <DashOld />
    </div>
  );
};

export default DashUsers;
