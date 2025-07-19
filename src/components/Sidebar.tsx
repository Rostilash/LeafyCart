import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <nav className="w-64 bg-gray-800 text-white h-full p-4">
      <ul className="space-y-2">
        <li>
          <Link to="/" className="hover:text-green-300">
            Головна
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-green-300">
            Увійти
          </Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-green-300">
            Реєстрація
          </Link>
        </li>
      </ul>
    </nav>
  );
};
