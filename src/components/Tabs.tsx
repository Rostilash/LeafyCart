import React, { useState } from "react";

interface Tab {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].value);

  return (
    <div className="w-full">
      {/* Navigation */}
      <nav className="flex justify-center border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 transition 2-t ${
              activeTab === tab.value ? "bg-[var(--leafy-green)] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="p-4">{tabs.map((tab) => activeTab === tab.value && <div key={tab.value}>{tab.content}</div>)}</div>
    </div>
  );
};

export default Tabs;
