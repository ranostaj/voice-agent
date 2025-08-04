import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  headerActions,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen) {
      if (!dialogElement.open) {
        dialogElement.showModal();
      }
      document.body.style.overflow = "hidden";
    } else {
      if (dialogElement.open) {
        dialogElement.close();
      }
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <dialog
      ref={dialogRef}
      className="w-full max-w-lg bg-primary-10 rounded-2xl shadow-xl p-8 m-0 relative   backdrop:bg-black/15"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      onClose={onClose}
    >
      <div className="flex justify-between items-center">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900" id="modal-title">
            {title}
          </h3>
        )}
        {headerActions && (
          <div className="flex items-center gap-2">{headerActions}</div>
        )}
      </div>

      <div className="py-18  overflow-y-auto flex justify-center">
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
