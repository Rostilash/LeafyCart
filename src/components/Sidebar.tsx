import { AccordionMenu } from "./AccordionMenu";

type SidebarProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  return (
    <>
      {isVisible && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed top-0 left-0 h-full w-screen md:w-64 lg:w-64 bg-white shadow-lg z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div>
          <div className="flex items-center p-3 sm:px-8 text-xl font-bold bg-white">
            <img src="/natural-leaf2.png" alt="Leaf" className="w-6 h-6" />
            LeafyCart
          </div>

          <AccordionMenu closeSidebar={onClose} />
        </div>
      </aside>
    </>
  );
};
