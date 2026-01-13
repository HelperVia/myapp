"use client";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContainer } from "../AuthContainer";
import { Alert, InputAdornment, TextField } from "@mui/material";
import { Email } from "@/components/forms/email";
import { signIn } from "next-auth/react";
import { PrimaryButton } from "@components/buttons/primary-button";
import { Password } from "@components/forms/password";
import { useSession } from "next-auth/react";
import { LoginFormValues } from "@/types/form/form";
export default function Login() {
  const { data } = useSession();
  const router = useRouter();

  const {
    register,
    trigger,
    getValues,
    setValue,
    getFieldState,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const loginAction = async () => {
    await trigger();

    if (!getFieldState("email").error && !getFieldState("password").error) {
      setLoading(true);

      const email = getValues("email");
      const password = getValues("password");
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        router.push("/login");
      }
      if (result?.error) {
        setLoading(false);
        setLoginError(result?.error);
      }
    }
  };

  return (
    <AuthContainer>
      <div className=" pl-[16px] pr-[16px] flex items-center justify-center ">
        <div className="max-w-[400px] mt-[40px] mb-0 ml-auto mr-auto w-[100%]">
          <div className="max-w-[320px] w-[100%] mt-0 ml-auto mr-auto mb-[20px] text-center">
            <h2>Log in to HelperVia</h2>
            <p className="mt-4 text-[.9rem] text-hv-color-2">
              Don't have an account?&nbsp;
              <Link href={"/signup"}> Create an account</Link>
            </p>
          </div>

          <div className="bg-white border-[1px] border-solid border-hv-color-1 rounded-[10px] p-[50px]">
            {loginError != "" && (
              <Alert variant="outlined" severity="error" className="mb-[10px]">
                {loginError}
              </Alert>
            )}
            <div className="mb-[.75rem]">
              <div className="relative text-[1rem] box-border">
                <Email
                  trigger={trigger}
                  register={register}
                  errors={errors}
                  label="Email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue("email", e.target.value)
                  }
                  value={getValues("email")}
                />
              </div>
            </div>
            <div className="mb-[.75rem]">
              <div className="relative text-[1rem] box-border">
                <Password
                  trigger={trigger}
                  register={register}
                  errors={errors}
                  label="Password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue("password", e.target.value)
                  }
                  value={getValues("password")}
                />
              </div>
            </div>
            <PrimaryButton onClick={loginAction} loading={loading}>
              Login
            </PrimaryButton>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}
