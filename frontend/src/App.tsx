import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { _get } from "./api/axiosClient";
import { INotificationsCount } from "./types";
import { setNotifications } from "./redux/features/notifications/contactNotificationSlice";

function App() {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const dispatch = useAppDispatch();

  // used in two places, can refactor
  const fetchNotificationCount = async () => {
    try {
      const res = await _get<INotificationsCount>(
        `/contact/notifications/${currentUser?.user.id}`
      );

      dispatch(setNotifications(res.data));
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
