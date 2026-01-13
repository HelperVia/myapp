import API from "@lib/api/api.server";
export const UpdateAgentService = async (id: string, data: {}) => {
  const Service = await API();
  return await Service.post("teams/agent/" + id + "/update", data);
};
