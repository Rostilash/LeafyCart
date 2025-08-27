import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/reduxTypeHook";
import { logoutUser } from "../redux/slices/authSlice";
import { UserCheck } from "lucide-react";

type UserSectionProps = {
  userName?: string;
};

export const UserSection: React.FC<UserSectionProps> = ({ userName }) => {
  const dispatch = useAppDispatch();

  if (userName) {
    return (
      <>
        <span className="hidden sm:inline-block">
          Ласкаво просимо <b>{userName}</b>!{" "}
        </span>
        <button onClick={() => dispatch(logoutUser())} className="cursor-pointer text-red-500 hover:underline">
          Вийти
        </button>
      </>
    );
  }

  return (
    <Link
      to="/auth"
      className="flex items-center gap-2 px-2 py-4 h-full hover:bg-[var(--leafy-dark)] hover:text-[var(--leafy-white)] transition-all duration-300"
    >
      <UserCheck size={20} /> <span className="hidden sm:inline-block">Увійти</span>
    </Link>
  );
};
