import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";

const Layout = () => {
  const [isNavOpend, setIsNavOpend] = useState(false);

  return (
    <div className="min-h-screen flex bg-[var(--leafy-light)]">
      <div className={`transition-all duration-300 ease-in-out bg-[var(--leafy-moss)] shadow-lg ${isNavOpend ? "w-64" : "w-0"} overflow-hidden`}>
        <Sidebar isVisible={isNavOpend} />
      </div>
      <main className="flex-1 bg-[var(--leafy-white)] overflow-auto">
        <Header setIsNavOpend={setIsNavOpend} isNavOpend={isNavOpend} />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
