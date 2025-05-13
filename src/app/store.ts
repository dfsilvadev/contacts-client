import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";

import categoryReducer from "@/features/categories/slice/categorySlice";
import contactReducer from "@/features/contacts/slices/contactSlice";

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    category: categoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
