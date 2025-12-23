import { validateInviteEmail as Service } from "@services/team/invite/email.validate.service";
export const validateInviteEmail = async (email: string) => {
  return await Service(email);
};
