// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { categoryTree } from "../utils/categoryTree";
// import { ChevronDown, ChevronUp } from "lucide-react";

// export const AccordionMenu = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);
//   const linkClass = "block w-full hover:text-white hover:bg-[var(--leafy-sage)] font-medium px-4 py-4 pl-8";

//   const toggle = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="space-y-4">
//       {categoryTree.map((cat, idx) => (
//         <div key={cat.title} className={linkClass}>
//           <button onClick={() => toggle(idx)} className="flex justify-between items-center w-full font-semibold  text-left">
//             <span className="cursor-pointer text-xl">{cat.title}</span>
//             {openIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//           </button>

//           {openIndex === idx && (
//             <ul className="mt-2 ml-2 space-y-1 pl-2 border-l border-[var(--leafy-sage)]">
//               {cat.subcategories.map((sub) => (
//                 <li key={sub}>
//                   <Link
//                     to={`/catalog/${sub.toLowerCase().replace(/\s+/g, "-")}`}
//                     className="text-lg text-[var(--leafy-gray)] hover:text-[var(--leafy-sage)] transition"
//                   >
//                     {sub}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

import { Link } from "react-router-dom";
import { categoryTree } from "../utils/categoryTree";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const AccordionMenu = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (title: string) => {
    setOpenCategory((prev) => (prev === title ? null : title));
  };

  const handleLinkClick = () => {
    setOpenCategory(null);
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
        <div key={cat.title} className="relative ">
          <button
            onClick={() => toggleCategory(cat.title)}
            className="flex justify-between items-center w-full font-semibold text-left hover:bg-[var(--leafy-sage)] px-4 py-4 focus:outline-none cursor-pointer"
          >
            <span className="text-xs">{cat.title}</span>
            {openCategory === cat.title ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {openCategory === cat.title && (
            <ul className="absolute left-[97%] top-0 ml-2 bg-[var(--leafy-bg)] shadow-lg z-10 min-w-[160px] transition-all duration-200 ">
              {cat.subcategories.map((sub) => (
                <Link key={sub} to={`/catalog/${sub.toLowerCase().replace(/\s+/g, "-")}`} onClick={handleLinkClick} className="block">
                  <li className="text-xs text-[var(--leafy-gray)] hover:text-[var(--leafy-white)] p-3 hover:bg-[var(--leafy-sage)] transition w-full">
                    {sub}
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
