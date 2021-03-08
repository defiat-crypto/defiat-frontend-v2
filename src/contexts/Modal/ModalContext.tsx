import React, { createContext } from "react";

export interface IModalContext {
  content?: React.ReactNode;
  isOpen?: boolean;
  onPresent: (content: React.ReactNode) => void;
  onDismiss: () => void;
}

export const ModalContext = createContext({
  onDismiss: () => {},
  onPresent: (content: React.ReactNode) => {},
});
