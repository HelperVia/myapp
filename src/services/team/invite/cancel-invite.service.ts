import API from "@lib/api/api.server";
export const CancelInviteService = async (id: string) => {
  const Service = await API();
  return Service.delete("teams/agent/invite/" + id + "/cancel", {});
};
