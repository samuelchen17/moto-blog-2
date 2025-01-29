import { ColumnDef } from "@tanstack/react-table";
import { IContactColumns } from "@/types";
import { format } from "date-fns";
import { Check, X } from "lucide-react";

export const columns: ColumnDef<IContactColumns>[] = [
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
];
