import { _get, _patch } from "@/api/axiosClient";
import { DataTable } from "../../ui/data-table";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ColumnDef } from "@tanstack/react-table";
import { IPostDeleteResponse, IPostResponse, IPostWithAuthor } from "@/types";
import { format } from "date-fns";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
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
import { Link } from "react-router-dom";
import HotPosts from "@/components/postComponents/HotPosts";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";

// add debounce to filtering
// only re render the rows, not the entire table

export function DashPostsTable({
  onHotPostChange,
}: {
  onHotPostChange: () => void;
}) {
  const [posts, setPosts] = useState<IPostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<
    "createdAt" | "title" | "category"
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
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // dynamically construct the url
        let url = `/post/get-posts/${currentUser?.user.id}?limit=${limit}`;
        const queryParams = new URLSearchParams();

        if (sortField) queryParams.append("sort", sortField);
        if (order) queryParams.append("order", order);
        if (searchTerm) queryParams.append("searchTerm", searchTerm);
        if (startIndex)
          queryParams.append("startIndex", startIndex as unknown as string);

        if (queryParams.toString()) {
          url += `&${queryParams.toString()}`;
        }

        const res = await _get<IPostResponse>(url);
        setPosts(res.data.posts);
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
      fetchPosts();
    }
  }, [currentUser?.user.id, sortField, order, startIndex, searchTerm]);

  const handlePagination = (direction: "next" | "prev") => {
    setStartIndex((prevIndex) =>
      direction === "next" ? prevIndex + limit : prevIndex - limit
    );
  };

  const handleDeletePost = async () => {
    setOpenModal(false);
    try {
      const res = await _delete<IPostDeleteResponse>(
        `/post/delete/${idSelected}/${currentUser?.user.id}`
      );

      const data = res.data;

      setPosts((prev) => prev.filter((post) => post._id !== idSelected));

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

  const toggleOrder = (field: "createdAt" | "title" | "category") => {
    if (sortField === field) {
      setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      // default to asc otherwise
      setOrder("asc");
    }
  };

  const handleSetHotPost = async (order: 1 | 2 | 3 | 4, postId: string) => {
    try {
      const res = await _patch<any>(
        `/post/set-hot-post/${currentUser?.user.id}/${postId}/${order}`
      );

      const data = res.data;

      onHotPostChange();
      // implement response type
      toast.success(data.message);
    } catch (err) {
      console.error("Error:", err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
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

  const columns: ColumnDef<IPostWithAuthor>[] = [
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
      accessorKey: "image",
      header: () => {
        return (
          <div className="flex items-center justify-center w-full">Image</div>
        );
      },
      cell: ({ row }) => {
        return (
          <Link to={`/blogs/post/${row.original.slug}`}>
            <img
              src={row.original.image}
              alt={row.original.title}
              className="min-w-40 h-20 object-cover bg-gray-500"
            />
          </Link>
        );
      },
    },
    {
      accessorKey: "title",
      header: () => {
        return (
          <Button
            className="flex items-center justify-center w-full"
            variant="ghost"
            onClick={() => toggleOrder("title")}
          >
            Title
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: () => {
        return (
          <Button
            className="flex items-center justify-center w-full"
            variant="ghost"
            onClick={() => toggleOrder("category")}
          >
            Category
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center justify-center w-full">
          {row.getValue("category")}
        </div>
      ),
    },
    {
      id: "engagement",
      header: () => {
        return (
          <div className="flex items-end justify-center w-full">Engagement</div>
        );
      },
      accessorFn: (row) => ({
        likes: row.likes,
        saves: row.saves,
      }),
      cell: ({ row }) => {
        const { likes, saves } = row.getValue("engagement") as {
          likes: number;
          saves: number;
        };

        return (
          <div className="flex flex-col justify-center w-full items-end">
            <span>Likes: {likes}</span>
            <span>Saves: {saves}</span>
          </div>
        );
      },
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
              <DropdownMenuLabel>Hot posts</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleSetHotPost(1, row.original._id)}
              >
                Set Post 1
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSetHotPost(2, row.original._id)}
              >
                Set Post 2
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSetHotPost(3, row.original._id)}
              >
                Set Post 3
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSetHotPost(4, row.original._id)}
              >
                Set Post 4
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link
                  to={`/dashboard/?tab=update-post/${row.original._id}`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </Link>
              </DropdownMenuItem>
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
      <DataTable columns={columns} data={posts}>
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
        handleDelete={handleDeletePost}
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
          disabled={posts.length < startIndex || posts.length < limit}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const DashPosts = () => {
  const [hotPostsChanged, setHotPostsChanged] = useState(false);

  const handleHotPostChange = () => {
    setHotPostsChanged((prev) => !prev);
  };

  return (
    <div>
      <h2 className="mb-2 font-semibold text-xl">Hot Posts Preview</h2>
      <HotPosts key={hotPostsChanged ? "changed" : "unchanged"} />
      <DashPostsTable onHotPostChange={handleHotPostChange} />
    </div>
  );
};

export default DashPosts;
