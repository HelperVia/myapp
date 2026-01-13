import API from "@lib/api/api.server";

export const verifyEmailCodeService = async (data: { code: string }) => {
  const Service = await API();
  return await Service.post("auth/email/verify", data);
};
