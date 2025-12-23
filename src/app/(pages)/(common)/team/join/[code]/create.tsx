"use client";
import { Signup } from "@components/forms/signup";

export const CreateJoin = ({
  code,
  email,
}: {
  code: string;
  email: string;
}) => {
  return <Signup invite_join={true} invite_code={code} email={email} />;
};
