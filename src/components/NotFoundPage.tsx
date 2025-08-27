import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col space-y-2 items-center justify-center h-full">
      <h3 className="title-xl">Сторінку не знайдено...</h3>

      <div className="flex flex-row items-center space-x-4">
        <span className="text-9xl">4</span>
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3N2p2eWxxNHFsZHp4MmU0czJ2NTdsODdrazU3aDdudGsxejFvd3ltOSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/V4OQW6TTQ6f4AMuJ7t/giphy.webp"
          alt="Not Found image"
          className="w-80 h-60 mb-20"
        />
        <span className="text-9xl">4</span>
      </div>

      <span>Повернутися до головної?</span>
      <Link to="/" className="flex items-center btn-primary btn_hover px-2 py-4">
        На головну
      </Link>
    </div>
  );
};
