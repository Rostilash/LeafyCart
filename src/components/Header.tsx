import { useAppSelector } from "../redux/reduxTypeHook";
import React from "react";
import { Link } from "react-router-dom";

type HeaderProps = {
  isNavOpened: boolean;
  quantity?: number;
  setIsNavOpend: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<HeaderProps> = ({ setIsNavOpend, setIsCartOpen, isNavOpened, quantity }) => {
  const { user } = useAppSelector((state) => state.auth);

  // take user name by email
  const userName = user?.email?.split("@")[0].toLocaleUpperCase();

  return (
    <header className="row-start-1 row-end-2 col-span-2 bg-[var(--leafy-sage)] p-2 shadow-md items-center justify-center ">
      <div className="flex justify-between  ">
        <div className="flex gap-4 items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/12127/12127163.png"
            alt="nav"
            className={`icon_images  ${isNavOpened ? "absolute left-50" : ""} `}
            onClick={() => {
              setIsNavOpend((prev) => !prev);
            }}
          />

          <Link to="/">Головна</Link>
          <Link to="/catalog">Каталог</Link>
        </div>
        <div className="relative flex justify-around items-center w-72 gap-4">
          <span>
            {userName ? (
              <span>
                Ласкаво просимо - <b>{userName}</b>!
              </span>
            ) : (
              <p>Увійти</p>
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
