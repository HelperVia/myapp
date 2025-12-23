import { InviteType } from "@/types/team/invite/invite.type";
import API from "@shared/lib/api/api.server";
export const teamInviteService = async (data: InviteType) => {
  return await API.post("teams/agent/invite", data);
};
