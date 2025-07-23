// components/NavigationLinks.tsx
import { Link } from "react-router-dom";

const linkClass = "block w-full hover:text-white hover:bg-[var(--leafy-sage)] font-medium px-4 py-4 pl-8";

export const NavigationLinks = () => {
  return (
    <>
      <Link to="/" className={linkClass}>
        Головна
      </Link>
      <Link to="/catalog" className={linkClass}>
        Каталог
      </Link>
      <Link to="/login" className={linkClass}>
        Увійти
      </Link>
    </>
  );
};
