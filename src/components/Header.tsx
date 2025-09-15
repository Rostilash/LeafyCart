import React from "react";
import { useAppSelector } from "../redux/reduxTypeHook";
import { Menu } from "lucide-react";
import { NavigationLinks } from "./NavigationLinks";
import { CartButton } from "./Buttons/CartButton";
import { UserSection } from "./UserSection";
import type { HeaderProps } from "../types/headerTypes";
import { getUserNameFromEmail } from "../utils/getUserNameByEmail";

export const Header: React.FC<HeaderProps> = ({ setIsNavOpend, setIsCartOpen, isNavOpened, quantity }) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <header
      className={`
    fixed left-0 w-screen z-[100] bg-[var(--leafy-white)] shadow-md transition-all duration-300
    bottom-0 sm:top-0 sm:bottom-auto
    ${isNavOpened ? "ml-0 md:ml-64 lg:ml-64 lg:pr-70" : "ml-0"}
  `}
    >
      <div className="flex justify-between items-center px-2 md:px-8">
        {/* Left side */}
        <div className="flex items-center gap-6">
          <Menu
            onClick={(e) => {
              e.stopPropagation();
              setIsNavOpend((prev) => !prev);
            }}
            className="cursor-pointer hover:scale-110"
          />
          <NavigationLinks user={user} />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <UserSection userName={user ? getUserNameFromEmail(user) : "Гість"} />
          <CartButton quantity={quantity} onClick={() => setIsCartOpen((prev) => !prev)} />
        </div>
      </div>
    </header>
  );
};
