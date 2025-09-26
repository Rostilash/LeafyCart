import { Link } from "react-router-dom";

export const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80dvh]">
      <h1 className="text-2xl font-bold text-green-600">Оплата успішна ✅</h1>
      <p className="mt-2 text-gray-600">Ваше замовлення прийнято в обробку.</p>
      <span className="flex flex-row gap-10">
        <Link to="/">На головну</Link>
        <Link to="/cart_rents">До замовлень</Link>
      </span>
    </div>
  );
};
