"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import { Password } from "@components/forms/password";
import { Email } from "@components/forms/email";

import Button from "@components/ui/Button";
import { FullName } from "./fullname";
import { SignupFormValues } from "@/types/form/form";
import { apiFetch } from "@/lib/api/api.fetch";
import { useSession } from "next-auth/react";
export const Signup = (props: {
  invite_join?: boolean;
  invite_code?: string;
  email?: string;
}) => {
  const { invite_join = false, invite_code = null, email = "" } = props;
  const {
    register,
    trigger,
    setValue,
    getValues,
    getFieldState,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const [loading, setLoading] = useState<boolean>(false);
  const { data, update } = useSession();
  const [signupError, setSignupError] = useState<string>("");

  useEffect(() => {
    setValue("email", email);
  }, []);
  const signupAction = async () => {
    await trigger();

    if (
      !getFieldState("email").error &&
      !getFieldState("password").error &&
      !getFieldState("fullname").error
    ) {
      setLoading(true);
      const response = await apiFetch(
        "/api/auth/register",
        {
          method: "POST",
          body: JSON.stringify({
            email: getValues("email"),
            password: getValues("password"),
            ...(invite_code ? { invite_code: invite_code } : {}),
            fullname: getValues("fullname"),
          }),
        },
        { loading: false }
      );

      if (!response?.ok) {
        setLoading(false);
        setSignupError(response?.error ?? "");
      }

      if (response?.ok) {
      }
    }
  };
  return (
    <div className=" pl-[16px] pr-[16px] flex items-center justify-center ">
      <div className="w-[400px] mt-[40px] mb-0 ml-auto mr-auto w-[100%]">
        {invite_join == false && (
          <div className=" w-[100%] mt-0 ml-auto mr-auto mb-[20px] text-center">
            <h2>Create Free Account</h2>
            <p className="mt-4 text-[.9rem] text-hv-color-2">
              Do you have an account ?&nbsp;<Link href={"/login"}>Login</Link>
            </p>
          </div>
        )}

        <div className="bg-white sm:border-[1px] border-solid border-0 border-hv-color-1 rounded-[10px] p-0 sm:p-[50px]">
          {signupError != "" && (
            <Alert variant="outlined" severity="error" className="mb-[10px]">
              {signupError}
            </Alert>
          )}
          <div className="mb-[.75rem]">
            <div className="relative text-[1rem] box-border text-hv-color-3">
              <FullName
                register={register}
                trigger={trigger}
                label="Fullname"
                placeholder="Fullname"
                errors={errors}
                size="medium"
                name="fullname"
                value={getValues("fullname")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue("fullname", e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mb-[.75rem]">
            <div className="relative text-[1rem] box-border text-hv-color-3">
              <Email
                trigger={trigger}
                register={register}
                errors={errors}
                label="Email"
                size="medium"
                name="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue("email", e.target.value)
                }
                disabled={invite_code !== null ? true : false}
              />
            </div>
          </div>
          <div className="mb-[.75rem]">
            <div className="relative text-[1rem] box-border">
              <Password
                register={register}
                trigger={trigger}
                label="Password"
                errors={errors}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue("password", e.target.value)
                }
              />
            </div>
          </div>

          <Button
            onClick={signupAction}
            variant="primary"
            loading={loading}
            size="md"
            fullWidth={true}
          >
            Create Account
          </Button>
        </div>
        <div className="mt-3">
          <p className="mt-4 text-[.9rem] text-hv-color-2">
            By registering you will accept the{" "}
            <Link href={"/login"}>
              <span className="text-hv-color-7 font-medium">
                User Agreement
              </span>
            </Link>{" "}
            and{" "}
            <Link href={"/login"}>
              <span className="text-hv-color-7 font-medium">
                Privacy Policy
              </span>
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
