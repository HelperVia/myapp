import API from "@shared/lib/api/api.server";
import { UserRegister } from "@/types/auth/register.type";
export const UserRegisterService = async (data: UserRegister) => {
  return API.post("auth/register", data);
};
