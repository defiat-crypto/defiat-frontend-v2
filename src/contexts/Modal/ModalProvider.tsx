import { Backdrop } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { ModalContext } from "./ModalContext";

const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>();

  const handlePresent = useCallback(
    (modalContent: React.ReactNode) => {
      setContent(modalContent);
      setIsOpen(true);
    },
    [setContent, setIsOpen]
  );

  const handleDismiss = useCallback(() => {
    setContent(undefined);
    setIsOpen(false);
  }, [setContent, setIsOpen]);

  return (
    <ModalContext.Provider
      value={{
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      {children}
      {isOpen && (
        <Backdrop open={isOpen}>
          {/* https://material-ui.com/components/backdrop/ */}
          {React.isValidElement(content) &&
            React.cloneElement(content, {
              isOpen,
              onDismiss: handleDismiss,
            })}
        </Backdrop>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
