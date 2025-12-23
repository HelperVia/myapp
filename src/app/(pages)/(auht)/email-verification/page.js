"use client";
import React, { useEffect, useRef, useState } from "react";
import { AuthContainer } from "../AuthContainer";

import { Alert, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { ApiResponse } from "@shared/lib/api/response/api.response.client";

const EmailVerification = () => {
  const numberOfDigits = 4;
  const [verifyError, setVerifyError] = useState("");
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [disabled, setDisabled] = useState(true);
  const [lastErrorValue, setLastErrorValue] = useState("");
  const otpBoxReference = useRef([]);

  const [loading, setLoading] = useState(false);
  const re = /^[0-9\b]+$/;
  function onPaste(event) {
    const pasted = event.clipboardData.getData("text/plain");
    if (pasted === "" || re.test(pasted)) {
      setOtp(pasted.split("").slice(0, otp.length));
    }
  }
  const verificationAction = async () => {
    if (otp.join("") != lastErrorValue) {
      setLoading(true);

      const response = await fetch("/api/auth/verify/email", {
        method: "POST",
        body: JSON.stringify({
          code: otp.join(""),
        }),
      });
      setLoading(false);
      const data = await ApiResponse(response);

      if (data?.ok) {
        window.location.reload();
      }

      if (!data?.ok) {
        setLastErrorValue(otp.join(""));
        setVerifyError(data?.error);
      }
    }
  };
  function handleChange(value, index) {
    if (value === "" || re.test(value)) {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);

      if (value && index < numberOfDigits - 1) {
        otpBoxReference.current[index + 1].focus();
      }
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && otp.join("").length == numberOfDigits) {
      verificationAction();
    }
  }
  useEffect(() => {
    setVerifyError("");
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
            {otp.map((digit, index) => (
              <TextField
                onPaste={onPaste}
                key={index}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                inputRef={(reference) =>
                  (otpBoxReference.current[index] = reference)
                }
                type="text"
                slotProps={{
                  htmlInput: {
                    maxLength: 1,
                    className: "text-center",
                  },
                }}
                className="w-14 h-14 !text-center text-2xl font-extrabold text-hv-color-13 bg-white  hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-hv-color-7 "
              />
            ))}
          </div>
          <div className="mt-[25px]">
            <Button
              color="grey"
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
