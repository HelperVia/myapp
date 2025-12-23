"use client";
import React, { useState } from "react";

import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

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

  console.log(data);
  const {
    register,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const loginAction = async () => {
    await trigger();

    if (!getFieldState("email").error && !getFieldState("password").error) {
      setLoading(true);

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

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
                  setValue={setEmail}
                  value={email}
                />
              </div>
            </div>
            <div className="mb-[.75rem]">
              <div className="relative text-[1rem] box-border">
                <Password
                  trigger={trigger}
                  register={register}
                  errors={errors}
                  setValue={setPassword}
                  value={password}
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
