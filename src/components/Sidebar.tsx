import { AccordionMenu } from "./AccordionMenu";

type SidebarProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  return (
    <aside
      className={`
    fixed top-0 left-0 h-full w-screen lg:w-64 bg-[var(--leafy-white)] shadow-lg z-50 text-[var(--leafy-gray)]
    transition-opacity duration-300 ease-in-out
    ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"}
  `}
    >
      <div>
        <div className="flex items-center p-3 sm:px-8 sm:p-5 text-xl font-bold text-[var(--leafy-black)] bg-[var(--leafy-white)]">
          <img src="/natural-leaf2.png" alt="Leaf" className="w-6 h-6" />
          LeafyCart
        </div>

        <AccordionMenu closeSidebar={onClose} />
      </div>
    </aside>
  );
};
