import { CancelInviteService } from "@/services/team/invite/cancel-invite.service";

export const CancelInviteDomain = async (id: string) => {
  return await CancelInviteService(id);
};
