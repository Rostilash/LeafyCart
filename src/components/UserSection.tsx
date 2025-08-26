import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/reduxTypeHook";
import { logoutUser } from "../redux/slices/authSlice";

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
    <Link to="/auth" className="border p-1 rounded-xl hover:bg-gray-100">
      Увійти
    </Link>
  );
};
