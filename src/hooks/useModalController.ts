import { useMemo } from "react";

import useAppDispatch from "@/hooks/useAppDispatch";

import {
  openModal,
  type ModalContent,
  type ModalType,
} from "@/features/ui/slices/uiSlices";

import { ModalConfig } from "@/libs/helpers/getModalConfig";

interface UseModalControllerResponse {
  readonly modalConfig: ModalConfig;
  readonly handleOpenModal: (payload: {
    type: ModalType;
    content: ModalContent;
  }) => void;
}

const useModalController = (): UseModalControllerResponse => {
  const dispatch = useAppDispatch();

  const modalConfig = useMemo(() => new ModalConfig(), []);

  const handleOpenModal = (payload: {
    type: ModalType;
    content: ModalContent;
  }) => dispatch(openModal(payload));

  return {
    modalConfig,
    handleOpenModal,
  };
};

export default useModalController;
