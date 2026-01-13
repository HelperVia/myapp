import { AcceptInviteService } from "@/services/team/invite/accept.invite.service";

export const AcceptInviteDomain = async (code: string) => {
  return await AcceptInviteService({
    code: code,
  });
};
