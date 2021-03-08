import { useCallback, useContext } from "react";
import { ModalContext } from "../contexts/Modal";

export const useModal = (modal: React.ReactNode) => {
  const { onDismiss, onPresent } = useContext(ModalContext);

  const handlePresent = useCallback(() => {
    onPresent(modal);
  }, [modal, onPresent]);

  return [handlePresent, onDismiss];
};
