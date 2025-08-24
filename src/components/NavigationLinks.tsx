import type React from "react";
import { Link } from "react-router-dom";
import type { AuthUser } from "../redux/slices/authSlice";
import { Box, Home, Settings, User } from "lucide-react";

interface NavigationLinksProps {
  user: AuthUser | null;
}

export const NavigationLinks: React.FC<NavigationLinksProps> = ({ user }) => {
  return (
    <nav className="flex flex-row space-x-4 sm:flex-row gap-4 sm:gap-6 items-center">
      {/* Головна */}
      <Link to="/" className="flex items-center gap-2">
        <Home size={20} />
        <span className="hidden sm:inline">Головна</span>
      </Link>

      {/* Каталог */}
      <Link to="/catalog" className="flex items-center gap-2">
        <Box size={20} />
        <span className="hidden sm:inline">Каталог</span>
      </Link>

      {/* Панель користувача */}
      {user && (
        <Link to="/cart_rents" className="flex items-center gap-2">
          <User size={20} />
          <span className="hidden sm:inline">Панель користувача</span>
        </Link>
      )}

      {/* Адмін панель */}
      {user && user.role === "admin" && (
        <Link to="/admin" className="flex items-center gap-2">
          <Settings size={20} />
          <span className="hidden sm:inline">Адмін панель</span>
        </Link>
      )}
    </nav>
  );
};
