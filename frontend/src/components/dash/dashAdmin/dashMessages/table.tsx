import { _get } from "@/api/axiosClient";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { IContactColumns, IContactForm } from "@/types";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export default function DemoPage() {
  const [contactMessages, setContactMessages] = useState<IContactColumns[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

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

  console.log(contactMessages);

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
    </div>
  );
}
