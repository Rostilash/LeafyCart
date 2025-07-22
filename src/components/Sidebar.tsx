import { Footer } from "./Footer";
import { NavigationLinks } from "./NavigationLinks";

type SidebarProps = {
  isVisible: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  return (
    <aside
      className={`
        flex flex-col justify-between top-0 left-0 h-full w-64 bg-[var(--leafy-moss)] shadow-lg z-50 text-[var(--leafy-gray)] py-6
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="space-y-4">
        <div className="flex items-center px-8 text-xl font-bold text-[var(--leafy-gray)]">
          <img src="/natural-leaf2.png" alt="Leaf" className="w-6 h-6" />
          LeafyCart
        </div>

        <NavigationLinks />
      </div>

      {/* Footer */}
      <Footer />
    </aside>
  );
};
