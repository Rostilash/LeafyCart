import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="pl-15 p-4">
      <Link to="/">Головна</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const name = decodeURIComponent(value);
        const catalogName = name[0].toUpperCase() + name.slice(1);
        return (
          <span key={to}>
            {" > "}
            <Link to={to}>{catalogName === "Catalog" ? "Каталог" : catalogName}</Link>
          </span>
        );
      })}
    </nav>
  );
};
