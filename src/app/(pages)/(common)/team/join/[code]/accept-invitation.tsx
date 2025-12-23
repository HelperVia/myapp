"use client";
import { PrimaryButton } from "@components/buttons/primary-button";

import { useState } from "react";
export const AcceptInvitation = ({ code }: { code: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const acceptHandle = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/teams/agent/invite/link/validate", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ code: code }),
      });
      const data = await response.json();
      console.log(data);
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
