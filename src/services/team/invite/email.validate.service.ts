import API from "@shared/lib/api/api.server";
export const validateInviteEmail = async (email: string) => {
  return await API.post("teams/agent/invite/email/validate", {
    email: email,
  });
};
