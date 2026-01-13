import { agentDeleteService } from "@/services/team/agent/delete.service";

export const agentDeleteDomain = async (id: string) => {
  return await agentDeleteService(id);
};
