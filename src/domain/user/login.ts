import { UserLoginType } from "@/types/auth/login.type";
import loginUserService from "@/services/user/user.login.service";
export default function loginUserDomain(data: UserLoginType) {
  let serviceData = {
    email: data.email,
    password: data.password,
  };
  return loginUserService(serviceData);
}
