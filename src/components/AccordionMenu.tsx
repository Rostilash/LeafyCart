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

export const AccordionMenu = () => {
  return (
    <div className="space-y-2 relative">
      {categoryTree.map((cat) => (
        <div key={cat.title} className="relative group">
          <button className="flex justify-between items-center w-full font-semibold text-left hover:bg-[var(--leafy-sage)] px-4 py-4 focus:outline-none">
            <span className="text-xs">{cat.title}</span>
            <ChevronDown size={20} className="group-focus-within:hidden group-hover:hidden" />
            <ChevronUp size={20} className="hidden group-focus-within:inline group-hover:inline" />
          </button>

          <ul className="absolute left-[97%] top-0 ml-2 bg-[var(--leafy-bg)] shadow-lg z-10 min-w-[160px] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity duration-200">
            {cat.subcategories.map((sub) => (
              <li
                key={sub}
                className="text-xs text-[var(--leafy-gray)] w-full hover:text-[var(--leafy-white)] p-3 hover:bg-[var(--leafy-sage)] transition"
              >
                <Link to={`/catalog/${sub.toLowerCase().replace(/\s+/g, "-")}`}>{sub}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
