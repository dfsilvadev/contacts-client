import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type {
  Contact,
  ContactResponse,
  NewContact,
} from "@/data/models/contact";
import type { ErrorResponse } from "@/data/models/erros";

import { handleThunkError } from "@/libs/redux/handleThunkError";

import { ContactServices } from "../services/contactServices";

type ContactState = {
  list: ContactResponse<Contact[]> | null;
  selected: ContactResponse<Contact> | null;
  loading: boolean;
  success: boolean;
  error: ErrorResponse | null;
};

const initialState: ContactState = {
  list: null,
  selected: null,
  loading: false,
  success: false,
  error: null,
};

const contactServices = new ContactServices();

export const fetchContacts = createAsyncThunk<
  ContactResponse<Contact[]>,
  { page: number; limit: number },
  { rejectValue: ErrorResponse }
>("contact/fetchContacts", async ({ page, limit }, { rejectWithValue }) => {
  try {
    const data = await contactServices.findAll({ page, limit });
    return data;
  } catch (error) {
    return rejectWithValue(handleThunkError(error));
  }
});

export const fetchContactById = createAsyncThunk<
  ContactResponse<Contact>,
  { contactId: string },
  { rejectValue: ErrorResponse }
>("contact/fetchContactById", async ({ contactId }, { rejectWithValue }) => {
  try {
    const data = await contactServices.findOne({ contactId });
    return data;
  } catch (error) {
    return rejectWithValue(handleThunkError(error));
  }
});

export const createContact = createAsyncThunk<
  ContactResponse<Contact>,
  { contact: NewContact },
  { rejectValue: ErrorResponse }
>("contact/createContact", async ({ contact }, { rejectWithValue }) => {
  try {
    const data = await contactServices.create({ contact });
    return data;
  } catch (error) {
    return rejectWithValue(handleThunkError(error));
  }
});

const contactSlices = createSlice({
  name: "contact",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.list = null;
        state.error = action.payload ?? {
          error: true,
          message: "An unknown error occurred.",
        };
      })
      .addCase(fetchContactById.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.selected = action.payload;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loading = false;
        state.selected = null;
        state.error = action.payload ?? {
          error: true,
          message: "An unknown error occurred.",
        };
      })
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      });
  },
});

export const { reset } = contactSlices.actions;

export default contactSlices.reducer;
