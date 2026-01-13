import API from "@lib/api/api.server";
export const SuspendAgentService = async (id: string) => {
  const Service = await API();
  return await Service.post("teams/agent/" + id + "/suspend", {});
};
