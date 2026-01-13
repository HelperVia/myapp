import { InviteType } from "@/types/team/invite/invite.type";
import API from "@lib/api/api.server";
export const teamInviteService = async (data: InviteType) => {
  const Service = await API();
  return await Service.post("teams/agent/invite", data);
};
