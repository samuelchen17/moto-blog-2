import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./features/user/userSlice";
import themeReducer from "./features/theme/themeSlice";
import imageReducer from "./features/image/imageSlice";
import storage from "redux-persist/lib/storage";
import authModalReducer from "./features/modal/authModalSlice";
import commentReducer from "./features/comment/commentSlice";
import showMoreLoadingReducer from "./features/loading/showMoreLoadingSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  image: imageReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persisted: persistedReducer,
    authModal: authModalReducer,
    comment: commentReducer,
    showMoreLoading: showMoreLoadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
