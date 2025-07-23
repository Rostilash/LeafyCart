type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[var(--leafy-gray)] bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl min-w-[300px] relative">
        <button className="absolute top-2 right-3 text-gray-600 cursor-pointer" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
