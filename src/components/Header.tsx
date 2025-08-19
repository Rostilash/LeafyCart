import { useAppDispatch, useAppSelector } from "../redux/reduxTypeHook";
import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/slices/authSlice";
import { Menu, ShoppingCart } from "lucide-react";
import { NavigationLinks } from "./NavigationLinks";

type HeaderProps = {
  isNavOpened: boolean;
  quantity?: number;
  setIsNavOpend: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<HeaderProps> = ({ setIsNavOpend, setIsCartOpen, isNavOpened, quantity }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const userName = user?.email?.split("@")[0].toLocaleUpperCase();

  return (
    <header
      className={`fixed top-0 left-0 w-screen sm:w-full z-50 bg-[var(--leafy-white)] shadow-md transition-all duration-300 ${
        isNavOpened ? "ml-none md:ml-84 lg:ml-64" : "ml-0"
      } z-100`}
    >
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        {/* left side */}
        <div className="flex items-center gap-4">
          <Menu onClick={() => setIsNavOpend((prev) => !prev)} className="cursor-pointer" />
          <Link to="/">Головна</Link>
          <nav className="hidden md:flex gap-6">
            <NavigationLinks />
          </nav>
          {user && user.role === "admin" && (
            <Link to="/admin" className="hover:underline">
              Адмін панель
            </Link>
          )}
        </div>

        {/* right side */}
        <div className="flex items-center gap-4">
          {userName ? (
            <>
              <span className="hidden sm:inline-block">
                Ласкаво просимо <b>{userName}</b>!{" "}
              </span>
              <button onClick={() => dispatch(logoutUser())} className="cursor-pointer text-red-500 hover:underline">
                Вийти
              </button>
            </>
          ) : (
            <Link to="/login" className="border p-2 rounded-xl hover:bg-gray-100">
              Увійти
            </Link>
          )}

          {/* Кошик */}
          <button onClick={() => setIsCartOpen((prev) => !prev)} className="relative p-2">
            <ShoppingCart className="w-6 h-6 text-[var(--leafy-dark)]" />
            {quantity !== undefined && quantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--leafy-sage)] font-bold text-black text-xs rounded-full px-1.5 py-0.5 shadow-md">
                {quantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
