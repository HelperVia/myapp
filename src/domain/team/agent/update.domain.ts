import { UpdateAgentService } from "@/services/team/agent/update.service";

export const UpdateAgentDomain = async (id: string, data: {}) => {
  return await UpdateAgentService(id, data);
};
