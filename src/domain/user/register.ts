import { UserRegister } from "@/types/auth/register.type";
import { UserRegisterService } from "@/services/user/user.register.service";
export const registerUserDomain = async (data: UserRegister) => {
  let serviceData = {
    email: data.email,
    password: data.password,
    fullname: data.fullname,
    ...(data.invite_code && { invite_code: data.invite_code }),
  };
  return UserRegisterService(serviceData);
};
