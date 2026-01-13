import API from "@lib/api/api.server";
import { UserLoginType } from "@/types/auth/login.type";
export default async function loginUserService(data: UserLoginType) {
  const Service = await API();
  return Service.post("auth/login", data);
}
