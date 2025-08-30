import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="p-6 md:pl-15 md:p-4 font-medium md:space-x-5">
      <Link to="/">Головна</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const name = decodeURIComponent(value);
        const catalogName = name[0].toUpperCase() + name.slice(1);
        return (
          <span key={to}>
            {" / "}
            <Link to={to}>{catalogName === "Catalog" ? "Каталог" : catalogName}</Link>
          </span>
        );
      })}
    </nav>
  );
};
