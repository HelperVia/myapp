import API from "@lib/api/api.server";
export const AcceptInviteService = async (data: { code: string }) => {
  const Service = await API();
  return await Service.post("teams/agent/invite/accept", data);
};
