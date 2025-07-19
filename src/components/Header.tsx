import { useAppSelector } from "../redux/reduxTypeHook";

export const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  return <header className="row-start-1 row-end-2 col-span-2 bg-blue-600 text-white p-4">Привіт {user?.email}</header>;
};
