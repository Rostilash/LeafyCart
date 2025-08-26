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
      className={`
    fixed left-0 w-screen z-100 bg-[var(--leafy-white)] shadow-md transition-all duration-300
    bottom-0 sm:top-0 sm:bottom-auto
    ${isNavOpened ? "ml-none md:ml-84 lg:ml-64" : "ml-0"}
  `}
    >
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        {/* Left side */}
        <div className="flex items-center gap-6">
          <Menu onClick={() => setIsNavOpend((prev) => !prev)} className="cursor-pointer" />

          <NavigationLinks user={user} />
        </div>

        {/* Right side */}
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
            <Link to="/auth" className="border p-1  rounded-xl hover:bg-gray-100">
              Увійти
            </Link>
          )}

          {/* Cart */}
          <button onClick={() => setIsCartOpen((prev) => !prev)} className="relative p-2 cursor-pointer">
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
