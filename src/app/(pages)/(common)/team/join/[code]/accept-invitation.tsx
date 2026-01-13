"use client";
import { apiFetch } from "@/lib/api/api.fetch";
import { PrimaryButton } from "@components/buttons/primary-button";
import { signIn, SignInOptions } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useState } from "react";
export const AcceptInvitation = ({ code }: { code: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const acceptHandle = async () => {
    setLoading(true);
    try {
      const response = await apiFetch(
        "/api/team/agent/invite/accept",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ code: code }),
        },
        {
          loading: false,
        }
      );

      if (response?.ok) {
        await signIn("token", {
          redirect: false,
          data: JSON.stringify(response.data),
        });
        router.push("choose-company");
      }
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-4 max-w-[200px]">
      <PrimaryButton loading={loading} onClick={acceptHandle}>
        Accept Invitation
      </PrimaryButton>
    </div>
  );
};
