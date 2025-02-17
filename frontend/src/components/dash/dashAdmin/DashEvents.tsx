import { _get, _patch, _delete } from "@/api/axiosClient";
import { DataTable } from "../../ui/data-table";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ColumnDef } from "@tanstack/react-table";
import { IEvent, IEventResponse } from "@/types";
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
import AddEventModal from "@/components/events/AddEventModal";

// only re render the rows, not the entire table, implement

export function DashEventsTable() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const [eventToBeEdited, setEventToBeEdited] = useState<IEvent>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [startIndex, setStartIndex] = useState(0);
  const [order, setOrder] = useState<"asc" | "desc">();
  const [sortField, setSortField] = useState<
    "createdAt" | "title" | "category"
  >();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idSelected, setIdSelected] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const limit = 10;

  // fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        // dynamically construct the url
        let url = `/event/get-events?limit=${limit}`;
        const queryParams = new URLSearchParams();

        if (sortField) queryParams.append("sort", sortField);
        if (order) queryParams.append("order", order);
        if (startIndex)
          queryParams.append("startIndex", startIndex as unknown as string);

        if (queryParams.toString()) {
          url += `&${queryParams.toString()}`;
        }

        const res = await _get<IEventResponse>(url);

        setEvents(res.data.events);
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
      fetchEvents();
    }
  }, [currentUser?.user.id, sortField, order, startIndex]);

  const handlePagination = (direction: "next" | "prev") => {
    setStartIndex((prevIndex) =>
      direction === "next" ? prevIndex + limit : prevIndex - limit
    );
  };

  const handleDelete = async () => {
    setOpenModal(false);
    try {
      const res = await _delete<any>(
        `/event/delete-event/${idSelected}/${currentUser?.user.id}`
      );

      const data = res.data;

      setEvents((prev) => prev.filter((event) => event._id !== idSelected));

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

  const toggleOrder = (field: "createdAt" | "title" | "category") => {
    if (sortField === field) {
      setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      // default to asc otherwise
      setOrder("asc");
    }
  };

  const handleEditClick = (event: IEvent) => {
    setEventToBeEdited(event);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const columns: ColumnDef<IEvent>[] = [
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
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div className="flex items-center justify-center w-full">
          {row.getValue("location")}
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
              <DropdownMenuItem onSelect={() => handleEditClick(row.original)}>
                <div className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </div>
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
      <AddEventModal setEvents={setEvents}>
        <Button className="mr-auto">Create event</Button>
      </AddEventModal>
      <DataTable columns={columns} data={events} />
      {/* delete confirmation */}
      <DeleteModal
        open={openModal}
        close={handleClose}
        handleDelete={handleDelete}
        message="this event from our servers"
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
          disabled={events.length < startIndex || events.length < limit}
        >
          Next
        </Button>

        <AddEventModal
          setEvents={setEvents}
          eventToBeEdited={eventToBeEdited}
          startOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

const DashEvents = () => {
  return (
    <div>
      <DashEventsTable />
    </div>
  );
};

export default DashEvents;
