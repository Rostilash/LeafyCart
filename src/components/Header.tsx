import { useAppSelector } from "../redux/reduxTypeHook";
import React from "react";
import { Link } from "react-router-dom";

type HeaderProps = {
  isNavOpend: boolean;
  setIsNavOpend: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<HeaderProps> = ({ setIsNavOpend, isNavOpend }) => {
  const { user } = useAppSelector((state) => state.auth);
  const email = user?.email;
  const userName = email?.split("@")[0].toLocaleUpperCase();

  return (
    <header className="row-start-1 row-end-2 col-span-2 bg-[var(--leafy-sage)] p-6 shadow-md">
      <div className="flex justify-between mb-8 ">
        <div className="flex gap-4">
          <img
            src="https://cdn-icons-png.flaticon.com/128/12127/12127163.png"
            alt="nav"
            className={`w-6 h-6 cursor-pointer  ${isNavOpend ? "absolute left-50" : ""} `}
            onClick={() => {
              setIsNavOpend((prev) => !prev);
            }}
          />

          <Link to="/">Головна</Link>
          <Link to="/catalog">Каталог</Link>
        </div>
        <div className="flex justify-around w-70">
          <span>
            {userName ? (
              <span>
                Ласкаво просимо - <b>{userName}</b>!
              </span>
            ) : (
              <p>Увійти</p>
            )}
          </span>
          <img src="https://cdn-icons-png.flaticon.com/128/1039/1039431.png" alt="" className="w-5 h-5 cursor-pointer " />
        </div>
      </div>
    </header>
  );
};
