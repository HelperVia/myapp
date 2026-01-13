import API from "@lib/api/api.server";
import { UserRegister } from "@/types/auth/register.type";
export const UserRegisterService = async (data: UserRegister) => {
  const Service = await API();
  return Service.post("auth/register", data);
};
