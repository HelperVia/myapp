import { InviteType } from "@/types/team/invite/invite.type";
import { teamInviteService } from "@services/team/invite/invite.service";
export const teamInviteDomain = async (data: InviteType) => {
  return await teamInviteService({
    email: data.email,
    role: data.role,
  });
};
