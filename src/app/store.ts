import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";

import categoryReducer from "@/features/categories/slice/categorySlices";
import contactReducer from "@/features/contacts/slices/contactSlices";
import uiReducer from "@/features/ui/slices/uiSlices";

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    category: categoryReducer,
    ui: uiReducer,
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
