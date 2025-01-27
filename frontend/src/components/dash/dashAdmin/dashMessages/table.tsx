import { _get } from "@/api/axiosClient";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { IContactColumns } from "@/types";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export default function DemoPage() {
  const [data, setData] = useState<IContactColumns[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await _get<IContactColumns[]>(
          `/contact/get-messages/${currentUser?.user.id}`
        );
        const data = res.data;

        setData(data);
      } catch (err) {
        console.error("Failed to fetch contact messages:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.user.id) {
      fetchData();
    }
  }, [currentUser?.user.id]);

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
