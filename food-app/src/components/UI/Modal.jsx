import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Reusable modal component
const Modal = ({ children, open, onClose, className = "" }) => {
  // Reference to the dialog element
  const dialog = useRef();

  // Open or close the modal based on the open prop
  useEffect(() => {
    const modal = dialog.current;
    if (open) modal.showModal();
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    // Render the modal outside the main React component tree
    document.getElementById("modal"),
  );
};

export default Modal;
