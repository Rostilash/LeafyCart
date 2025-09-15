import type { AuthUser } from "../redux/slices/authSlice";

export const getUserNameFromEmail = (user: AuthUser) => {
  return user?.email?.split("@")[0].toLocaleUpperCase();
};
