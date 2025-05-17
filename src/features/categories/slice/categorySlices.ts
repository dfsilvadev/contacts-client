import type { CategoriesResponse, Category } from "@/data/models/category";
import type { ErrorResponse } from "@/data/models/erros";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "../service/categoryServices";

type CategoryState = {
  list: CategoriesResponse<Category[]> | null;
  loading: boolean;
  success: boolean;
  error: ErrorResponse | boolean | undefined;
};

const initialState: CategoryState = {
  list: null,
  loading: false,
  success: false,
  error: false,
};

export const fetchCategories = createAsyncThunk<
  CategoriesResponse<Category[]>,
  void,
  { rejectValue: ErrorResponse }
>("category/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const data = await categoryService.list();

    if (!data || ("error" in data && data.error)) {
      return rejectWithValue({
        error: true,
        message: data?.message || "An unknown error occurred.",
      });
    }

    return data as CategoriesResponse<Category[]>;
  } catch (error) {
    return rejectWithValue({
      error: true,
      message:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

const categorySlice = createSlice({
  name: "category",
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
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.list = null;
        state.error = action.payload ?? {
          error: true,
          message: "An unknown error occurred.",
        };
      });
  },
});

export const { reset } = categorySlice.actions;

export default categorySlice.reducer;
