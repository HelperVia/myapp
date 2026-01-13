import { verifyEmailCodeService } from "@/services/user/verify.email.service";

export const VerifyEmailCodeDomain = async (code: string) => {
  return await verifyEmailCodeService({
    code: code,
  });
};
