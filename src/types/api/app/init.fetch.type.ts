import { TeamType } from "@/types/team/agent/agent.type";
import { AccountType } from "@/types/users/account.type";
export type ApiInitFetchType = {
  token: string;
  teams: TeamType;
  account: AccountType;
  license_number: string;
};
