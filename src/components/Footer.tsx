import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[var(--leafy-gray)] text-gray-300 py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Logo & contact */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">leafycart</h2>
          <p className="mb-2 font-semibold">Напишіть нам</p>
          <div className="flex justify-center space-x-3 mb-3">
            <Link to="#">
              <span className="bg-yellow-400 w-8 h-8 flex items-center justify-center rounded-full">💬</span>
            </Link>
            <Link to="#">
              <span className="bg-sky-400 w-8 h-8 flex items-center justify-center rounded-full">✈️</span>
            </Link>
            <Link to="#">
              <span className="bg-purple-500 w-8 h-8 flex items-center justify-center rounded-full">📞</span>
            </Link>
            <Link to="#">
              <span className="bg-green-500 w-8 h-8 flex items-center justify-center rounded-full">📱</span>
            </Link>
            <Link to="#">
              <span className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-full">💬</span>
            </Link>
          </div>
          <p className="text-sm">Запитання та відповіді</p>
          <p className="text-sm">Залишити скаргу чи запитання</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">leafycart</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#">Оплата та доставка</a>
            </li>
            <li>
              <a href="#">Питання та відповіді</a>
            </li>
            <li>
              <a href="#">Оферта</a>
            </li>
            <li>
              <a href="#">Політика конфіденційності</a>
            </li>
            <li>
              <a href="#">Умови користування</a>
            </li>
            <li>
              <a href="#">Для постачальників</a>
            </li>
            <li>
              <a href="#">Рецепти</a>
            </li>
            <li>
              <a href="#">Контакти</a>
            </li>
            <li>
              <a href="#">Магазини</a>
            </li>
            <li>
              <a href="#">Вакансії</a>
            </li>
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="text-white font-semibold mb-4">Контакти</h3>
          <p className="text-sm">help@leafycart.com</p>
          <p className="text-sm">м. Ужгород, вул. Легоцького 24</p>
          <div className="flex space-x-4 mt-4 text-xl">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © 2010 - {new Date().getFullYear()} Всі права захищені. LIMITED LIABILITY COMPANY "LEAFYCART"
      </div>
    </footer>
  );
};
