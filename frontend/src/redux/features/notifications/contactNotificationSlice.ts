import { INotificationsCount } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: INotificationsCount = {
  notificationsCount: 0,
};

const contactNotificationSlice = createSlice({
  name: "contactNotification",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<INotificationsCount>) => {
      state.notificationsCount = action.payload.notificationsCount;
    },
  },
});

export const { setNotifications } = contactNotificationSlice.actions;

export default contactNotificationSlice.reducer;
