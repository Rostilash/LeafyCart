import type React from "react";
import { Link } from "react-router-dom";
import type { AuthUser } from "../redux/slices/authSlice";
import { Box, Home, Settings, User } from "lucide-react";

interface NavigationLinksProps {
  user: AuthUser | null;
}
type NavItem = {
  to: string;
  label: string;
  icon: React.ReactNode;
  show?: (user: AuthUser | null) => boolean;
};

export const NavigationLinks: React.FC<NavigationLinksProps> = ({ user }) => {
  const links: NavItem[] = [
    { to: "/", label: "Головна", icon: <Home size={20} /> },
    { to: "/catalog", label: "Каталог", icon: <Box size={20} /> },
    { to: "/cart_rents", label: "Панель користувача", icon: <User size={20} />, show: (u) => !!u },
    { to: "/admin", label: "Адмін панель", icon: <Settings size={20} />, show: (u) => u?.role === "admin" },
  ];

  return (
    <nav className="flex flex-row space-x-4 sm:flex-row gap-4 sm:gap-0 items-center">
      {links
        .filter((link) => (link.show ? link.show(user) : true))
        .map((link) => (
          <Link key={link.to} to={link.to} className="flex items-center gap-2 hover:bg-gray-200">
            {link.icon}
            <span className="hidden sm:inline">{link.label}</span>
          </Link>
        ))}
    </nav>
  );
};
