import { SuspendAgentService } from "@/services/team/agent/suspend.service";

export const SuspendAgentDomain = async (id: string) => {
  return await SuspendAgentService(id);
};
