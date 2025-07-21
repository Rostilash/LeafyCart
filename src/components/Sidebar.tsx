import { Link } from "react-router-dom";
import { Footer } from "./Footer";

type SidebarProps = {
  isVisible: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  const linkClass = "block w-full hover:text-white hover:bg-[var(--leafy-sage)] font-medium px-4 py-4 pl-8";
  return (
    <aside
      className={`
        flex flex-col justify-between top-0 left-0 h-full w-64 bg-[var(--leafy-moss)] shadow-lg z-50 text-[var(--leafy-gray)] py-6
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="space-y-8">
        <div className="flex items-center gap-2 px-8 text-xl font-bold text-[var(--leafy-gray)]">
          <img src="/natural-leaf2.png" alt="Leaf" className="w-6 h-6" />
          LeafyCart
        </div>

        <nav className="space-y-4 text-[var(--leafy-gray)] font-medium">
          <Link to="/" className={linkClass}>
            Головна
          </Link>
          <Link to="/catalog" className={linkClass}>
            Каталог
          </Link>
          <Link to="/login" className={linkClass}>
            Увійти
          </Link>
          <Link to="/cart" className={linkClass}>
            Кошик
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <Footer />
    </aside>
  );
};
