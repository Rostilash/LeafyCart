import { AccordionMenu } from "./AccordionMenu";
import { Footer } from "./Footer";

type SidebarProps = {
  isVisible: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  return (
    <aside
      className={`
        flex flex-col justify-between top-0 left-0 h-full w-100 lg:w-64 bg-[var(--leafy-bg)] shadow-lg z-50 text-[var(--leafy-gray)] 
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div>
        <div className="flex items-center px-8 p-5 text-xl font-bold text-[var(--leafy-black)] bg-[var(--leafy-sage)]">
          <img src="/natural-leaf2.png" alt="Leaf" className="w-6 h-6" />
          LeafyCart
        </div>

        <AccordionMenu />
      </div>
    </aside>
  );
};
