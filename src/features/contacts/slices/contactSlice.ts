import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import contactService from "../services/contactServices";

import type { ContactResponse } from "@/data/models/contact";
import type { ErrorResponse } from "@/data/models/erros";

type ContactState = {
  contacts: ContactResponse | null;
  loading: boolean;
  success: boolean;
  error: ErrorResponse | boolean | undefined;
};

const initialState: ContactState = {
  contacts: null,
  loading: false,
  success: false,
  error: false,
};

export const fetchContacts = createAsyncThunk<
  ContactResponse,
  { page: number; limit: number },
  { rejectValue: ErrorResponse }
>("contact/fetchContacts", async ({ page, limit }, { rejectWithValue }) => {
  try {
    const data = await contactService.list(page, limit);

    if (!data || ("error" in data && data.error)) {
      return rejectWithValue({
        error: true,
        message: data?.message || "An unknown error occurred.",
      });
    }

    return data as ContactResponse;
  } catch (error) {
    return rejectWithValue({
      error: true,
      message:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.contacts = null;
        state.error = action.payload ?? {
          error: true,
          message: "An unknown error occurred.",
        };
      });
  },
});

export const { reset } = contactSlice.actions;

export default contactSlice.reducer;
