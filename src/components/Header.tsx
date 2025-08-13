import { useAppDispatch, useAppSelector } from "../redux/reduxTypeHook";
import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/slices/authSlice";

type HeaderProps = {
  isNavOpened: boolean;
  quantity?: number;
  setIsNavOpend: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<HeaderProps> = ({ setIsNavOpend, setIsCartOpen, isNavOpened, quantity }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  // take user name by email if user didnt enter name
  const userName = user?.email?.split("@")[0].toLocaleUpperCase();

  return (
    <header className="row-start-1 row-end-2 col-span-2 bg-[var(--leafy-sage)] p-3.5 shadow-md items-center justify-center text-white">
      <div className="flex justify-between  ">
        {/* left side */}
        <div className="flex gap-4 items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/12127/12127163.png"
            alt="nav"
            className={`icon_images  ${isNavOpened ? "absolute left-50" : ""} z-20`}
            onClick={() => {
              setIsNavOpend((prev) => !prev);
            }}
          />

          <Link to="/">Головна</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/cart_rents">Панель користувача</Link>
          {user && user.role === "admin" && <Link to="/admin">Адмін панель</Link>}
        </div>
        {/* right side */}
        <div className="relative flex justify-around items-center gap-4">
          <span>
            {userName ? (
              <span>
                Ласкаво просимо - <b>{userName}</b>! /{" "}
                <button onClick={() => dispatch(logoutUser())} className="cursor-pointer">
                  Вийти
                </button>
              </span>
            ) : (
              <Link to="/login" className="border p-2 rounded-2xl">
                Увійти
              </Link>
            )}
          </span>
          <img
            src="https://cdn-icons-png.flaticon.com/128/1039/1039431.png"
            alt=""
            className="icon_images"
            onClick={() => {
              setIsCartOpen((prev) => !prev);
            }}
          />
          {quantity !== undefined && quantity > 0 && (
            <span className="absolute -bottom-2 right-10 bg-[var(--leafy-green)] text-white text-xs rounded-full px-1.5 py-0.5 leading-none shadow-md">
              {quantity}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
