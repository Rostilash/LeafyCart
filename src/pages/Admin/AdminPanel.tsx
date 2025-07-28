import { Link } from "react-router-dom";

export const AdminPanel = () => {
  return (
    <section className="p-10">
      <Link to="products" className="p-3  rounded bg-[var(--leafy-moss)]">
        Редагування постів
      </Link>
    </section>
  );
};
