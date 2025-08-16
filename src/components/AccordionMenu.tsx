import { Link } from "react-router-dom";
import { categoryTree } from "../utils/categoryTree";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

type AccordionMenuProps = {
  closeSidebar: () => void;
};

export const AccordionMenu: React.FC<AccordionMenuProps> = ({ closeSidebar }) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (title: string) => {
    setOpenCategory((prev) => (prev === title ? null : title));
  };

  const handleLinkClick = () => {
    setOpenCategory(null);
    closeSidebar();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-2 relative cursor-pointer" ref={menuRef}>
      {categoryTree.map((cat) => (
        <div key={cat.title} className="relative">
          <button
            onClick={() => toggleCategory(cat.title)}
            className="flex justify-between items-center w-full font-semibold text-left hover:bg-[var(--leafy-sage)] px-4 py-4 focus:outline-none cursor-pointer"
          >
            <span className="text-xs">{cat.title}</span>
            {openCategory === cat.title ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {/* subcategories maping here */}
          {openCategory === cat.title && (
            <ul
              className="absolute right-0 lg:left-[97%] top-0 lg:ml-2 bg-[var(--leafy-bg)] shadow-lg z-10 min-w-1/2 lg:min-w-[160px] transition-all duration-200 "
              onMouseLeave={() => setOpenCategory(null)}
            >
              {cat.subcategories.map((sub) => (
                <Link key={sub.name} to={`/catalog/${sub.name.toLowerCase().replace(/\s+/g, "-")}`} onClick={handleLinkClick} className="block">
                  <li className="text-xs text-[var(--leafy-gray)] hover:text-[var(--leafy-white)] p-3 hover:bg-[var(--leafy-dark)] transition w-full">
                    {sub.name}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
