import API from "@lib/api/api.server";
export const agentDeleteService = async (id: string) => {
  const Service = await API();
  return await Service.delete("teams/agent/" + id + "/delete", {});
};
