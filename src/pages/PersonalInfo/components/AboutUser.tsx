import { Card, CardContent } from "@mui/material";
import { useAppSelector } from "../../../redux/reduxTypeHook";

export const AboutUser = () => {
  const userEmail = useAppSelector((state) => state.auth.user?.email);
  return (
    <Card className="col-span-1 shadow-lg rounded-2xl">
      <CardContent className="p-6 flex flex-col items-center">
        <img
          src={`https://ui-avatars.com/api/?name=${userEmail}&background=random`}
          alt="User Avatar"
          className="w-24 h-24 rounded-full shadow-md mb-4"
        />
        <h1 className="text-xl font-semibold text-gray-800">Особистий кабінет</h1>
        <p className="text-gray-500 mt-1">{userEmail}</p>
      </CardContent>
    </Card>
  );
};
