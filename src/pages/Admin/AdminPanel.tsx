import { Link } from "react-router-dom";
import { Database, Settings } from "lucide-react";

export const AdminPanel = () => {
  const panels = [
    {
      to: "products",
      label: "Редагування постів",
      icon: <Database className="w-6 h-6 text-[var(--leafy-green)]" />,
    },
    {
      to: "settings",
      label: "Налаштування",
      icon: <Settings className="w-6 h-6 text-[var(--leafy-green)]" />,
    },
  ];

  return (
    <section className="p-10">
      <h3 className="title-l mb-6 text-center">Панель адміністратора</h3>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {panels.map((panel) => (
          <Link
            key={panel.to}
            to={panel.to}
            className="flex items-center gap-4 p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition hover:bg-[var(--leafy-bg)]"
          >
            {panel.icon}
            <span className="text-md font-medium">{panel.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
