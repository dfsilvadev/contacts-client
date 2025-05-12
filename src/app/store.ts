import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";

import contactReducer from "@/features/contacts/slices/contactSlice";

export const store = configureStore({
  reducer: {
    contact: contactReducer,
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
