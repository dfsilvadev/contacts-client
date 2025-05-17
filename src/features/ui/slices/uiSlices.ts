import type { Contact } from "@/data/models/contact";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "create" | "edit" | "delete";

export type ModalContent = {
  contact?: Contact | null;
  title?: string;
  description?: string;
};

export type UiState = {
  isOpen: boolean;
  modalType: ModalType | null;
  modalContent: ModalContent | null;
};

const initialState: UiState = {
  isOpen: false,
  modalType: null,
  modalContent: null,
};

const uiSlices = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        type: ModalType;
        content: ModalContent | null;
      }>
    ) => {
      state.isOpen = true;
      state.modalType = action.payload.type;
      state.modalContent = action.payload.content ?? null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.modalContent = null;
    },
  },
});

export const { openModal, closeModal } = uiSlices.actions;

export default uiSlices.reducer;
