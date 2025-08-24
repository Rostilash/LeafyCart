import { Link } from "react-router-dom";
import { AccordionMenu } from "./AccordionMenu";
import { User } from "lucide-react";

type SidebarProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  return (
    <aside
      className={`
    fixed top-0 left-0 h-full w-screen lg:w-64 bg-[var(--leafy-bg)] shadow-lg z-50 text-[var(--leafy-gray)]
    transition-opacity duration-300 ease-in-out
    ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"}
  `}
    >
      <div>
        <div className="flex items-center p-3 sm:px-8 sm:p-5 text-xl font-bold text-[var(--leafy-black)] bg-[var(--leafy-bg)]">
          <img src="/natural-leaf2.png" alt="Leaf" className="w-6 h-6" />
          LeafyCart
        </div>

        <AccordionMenu closeSidebar={onClose} />

        <div className="flex flex-col space-y-8 pl-4 pt-6 text-xs">
          <Link to="/cart_rents" onClick={() => onClose()} className="flex flex-row gap-2">
            <User size={16} /> Панель користувача
          </Link>
        </div>
      </div>
    </aside>
  );
};
