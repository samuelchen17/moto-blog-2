import { ColumnDef } from "@tanstack/react-table";
import { IContactColumns } from "@/types";

export const columns: ColumnDef<IContactColumns>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
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
  },
];
