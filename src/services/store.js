import { configureStore } from "@reduxjs/toolkit";
import { ArticleAPI } from "./article";

export const store = configureStore({
  reducer: {
    [ArticleAPI.reducerPath]: ArticleAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
