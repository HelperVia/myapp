"use client";
import { AuthContainer } from "../AuthContainer";
import { Signup } from "@components/forms/signup";

export default function SignupPage() {
  return (
    <AuthContainer>
      <Signup />
    </AuthContainer>
  );
}
