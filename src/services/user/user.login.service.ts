import API from "@shared/lib/api/api.server";
import { UserLoginType } from "@/types/auth/login.type";
export default async function loginUserService(data: UserLoginType) {
  return API.post("auth/login", data);
}
