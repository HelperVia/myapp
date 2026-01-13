import API from "@lib/api/api.server";
export const validateInviteEmail = async (email: string) => {
  const Service = await API();
  return await Service.post("teams/agent/invite/email/validate", {
    email: email,
  });
};
