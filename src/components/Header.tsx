import React from "react";
import { useAppSelector } from "../redux/reduxTypeHook";
import { Menu } from "lucide-react";
import { NavigationLinks } from "./NavigationLinks";
import { CartButton } from "./Buttons/CartButton";
import { UserSection } from "./UserSection";
import type { HeaderProps } from "../types/headerTypes";

export const Header: React.FC<HeaderProps> = ({ setIsNavOpend, setIsCartOpen, isNavOpened, quantity }) => {
  const { user } = useAppSelector((state) => state.auth);
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
          <UserSection userName={userName} />
          <CartButton quantity={quantity} onClick={() => setIsCartOpen((prev) => !prev)} />
        </div>
      </div>
    </header>
  );
};
