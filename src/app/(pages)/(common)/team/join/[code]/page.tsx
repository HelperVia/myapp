"use client";

import { useRouter } from "next/navigation";
import { CreateJoin } from "./create";
import { AcceptInvitation } from "./accept-invitation";
import { useParams } from "next/navigation";
import { apiFetch } from "@lib/api/api.fetch";
import { useEffect, useState } from "react";
import { _activeRequests } from "@/shared/lib/api/api.fetch";
import { AGENT_ROLE_AGENT, AGENT_ROLE_SUPERADMIN } from "@/constants/Agent";

type InviteType = {
  company: string;
  full_name: string;
  has_account: boolean;
  invited_email: string;
  invited_role: typeof AGENT_ROLE_AGENT | typeof AGENT_ROLE_SUPERADMIN;
  invited_role_description: string;
};
export default function TeamJoinLink() {
  const { code } = useParams<{ code: string }>();
  const router = useRouter();
  const [status, setStatus] = useState<boolean>(false);
  const [invite, setInvite] = useState<InviteType | Record<string, never>>();
  const checkInviteCode = async (code: string) => {
    try {
      const data = await apiFetch<InviteType>(
        "/api/team/agent/invite/validate/code",
        {
          method: "POST",
          body: JSON.stringify({
            code: code,
          }),
        }
      );

      if (data?.ok) {
        setStatus(true);

        setInvite(data?.data);
      }
      if (!data?.ok) {
        router.replace("/404");
      }
    } catch (error) {
      router.replace("/404");
    }
  };

  useEffect(() => {
    checkInviteCode(code);
  }, []);

  if (_activeRequests > 0 || !status) return null;
  return (
    <div className="pl-0 pr-0 sm:pl-[16px] sm:pr-[16px] flex items-center justify-center ">
      <div className="sm:w-[550px] mt-[40px] mb-0 ml-auto mr-auto w-[100%]">
        <div className="flex justify-center items-center flex-col w-[100%] mt-0 ml-auto mr-auto mb-[20px] text-center">
          <h1>
            🎉 You’ve been invited to join the <b>{invite?.company}</b> team!
          </h1>
          {invite?.has_account === false ? (
            <CreateJoin code={code} email={invite?.invited_email} />
          ) : (
            <AcceptInvitation code={code} />
          )}
        </div>
      </div>
    </div>
  );
}
