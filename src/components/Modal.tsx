import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm transition-opacity ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      // onClick={onClose}
    >
      <div
        className="
      bg-white p-1 md:p-6 md:rounded-xl shadow-xl 
      relative 
      w-full max-w-6xl
      max-h-[100vh] 
      overflow-y-auto
    "
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute font-bold top-2 right-3 text-gray-600 text-2xl cursor-pointer z-100" onClick={onClose}>
          ✕
        </button>
        {isOpen && children}
      </div>
    </div>
  );
};
