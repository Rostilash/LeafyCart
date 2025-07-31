import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-opacity-30 backdrop-blur-xs max-w-[100vw] flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl min-w-[300px] relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-3 text-gray-600 text-2xl cursor-pointer" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
