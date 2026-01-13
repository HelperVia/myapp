"use client";
import React, { useEffect, useRef, useState } from "react";
import { AuthContainer } from "../AuthContainer";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
import { Otp } from "@components/forms/otp";
import { apiFetch } from "@/lib/api/api.fetch";
import { YES } from "@/shared/constants/YesNo";

const EmailVerification = () => {
  const { data, update } = useSession();
  const router = useRouter();
  const numberOfDigits = 4;
  const [verifyError, setVerifyError] = useState<string>("");
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [disabled, setDisabled] = useState<boolean>(true);
  const [lastErrorValue, setLastErrorValue] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const otpCallback = (otp: any[]) => {
    setOtp(otp);
  };
  const verificationAction = async () => {
    if (otp.join("") != lastErrorValue && !loading) {
      setLoading(true);

      const data = await apiFetch(
        "api/auth/verify/email",
        {
          method: "POST",
          body: JSON.stringify({
            code: String(otp.join("")),
          }),
        },
        {
          loading: false,
        }
      );

      if (data?.ok) {
        await update({ emailVerify: YES });
        router.push("/my");
      }

      if (!data?.ok) {
        setLastErrorValue(otp.join(""));
        setVerifyError(data?.error as string);
        setLoading(false);
        setDisabled(true);
      }
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    if (otp.join("").length == numberOfDigits) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [otp]);

  return (
    <AuthContainer bg_color="hv-color-12" back_login={true}>
      <div className="min-h-[550px] pl-[16px] pr-[16px] flex items-center justify-center">
        <div className="max-w-[320px]  mb-0 ml-auto mr-auto w-[100%]">
          <div className="max-w-[320px] w-[100%] mt-0 ml-auto mr-auto mb-[20px] text-center">
            <h2>Enter Verification Code</h2>
            <p className="mt-4 text-[.9rem] text-hv-color-2">
              We have sent your verification code to your e-mail address.
            </p>
          </div>

          {verifyError != "" && (
            <Alert variant="outlined" severity="error" className="mb-[10px]">
              {verifyError}
            </Alert>
          )}
          <div className="flex items-center justify-between gap-3">
            <Otp
              digits={numberOfDigits}
              action={verificationAction}
              callback={otpCallback}
            />
          </div>
          <div className="mt-[25px]">
            <Button
              color="brandGrey"
              variant="contained"
              fullWidth
              onClick={verificationAction}
              disabled={disabled}
              loading={loading}
            >
              Verify
            </Button>
          </div>
          <div className="mt-4 text-center text-hv-color-2">
            <div>
              Paste the code sent to your e-mail address into the box and
              continue.
            </div>
            <span>
              Didn't get an email?{" "}
              <a href="" className="text-hv-color-7 ">
                Send it again
              </a>
            </span>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default EmailVerification;
