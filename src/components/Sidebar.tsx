import { AccordionMenu } from "./AccordionMenu";

type SidebarProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  return (
    <>
      {isVisible && <div className="fixed inset-0 bg-black/10 z-40" onClick={onClose} />}

      <aside
        className={`
          fixed top-0 h-full w-full sm:w-64 shadow-lg z-50 transition-all duration-200 ease-in-out bg-white 
          ${isVisible ? "left-0" : "-left-[350px] opacity-0 "}`}
      >
        <div>
          <div className="flex items-center p-3 sm:px-8 text-xl font-bold">
            <img src="/natural-leaf2.png" alt="Leaf" className="w-6 h-6" />
            LeafyCart
          </div>

          <AccordionMenu closeSidebar={onClose} />
        </div>
      </aside>
    </>
  );
};
