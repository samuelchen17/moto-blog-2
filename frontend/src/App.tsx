import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { useEffect } from "react";
import { useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { _get } from "./api/axiosClient";

function App() {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const fetchNotificationCount = async () => {
    try {
      const res = await _get<number>(
        `/contact/notifications/${currentUser?.user.id}`
      );
      console.log(res.data);
    } catch (err) {
      console.error("Failed to fetch notification count:", err);
    }
  };

  useEffect(() => {
    if (currentUser?.user.admin) {
      fetchNotificationCount();
    }
  }, [currentUser?.user.id, location.pathname]);

  return <RouterProvider router={router} />;
}

export default App;
