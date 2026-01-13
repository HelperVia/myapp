import { TextField } from "@mui/material";
import { useEffect, useState, useRef, ClipboardEventHandler } from "react";

type OtpType = {
  digits?: number;
  callback?: ((otp: any[]) => void) | null;
  action?: (() => void) | null;
};
export const Otp = ({
  digits = 4,
  action = null,
  callback = null,
}: OtpType) => {
  const [otp, setOtp] = useState(new Array(digits).fill(""));
  const otpBoxReference = useRef<HTMLInputElement[]>([]);
  const re = /^[0-9\b]+$/;

  function onPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData("text/plain");

    if (pasted === "" || re.test(pasted)) {
      const newOtp = pasted.split("").slice(0, otp.length);
      setOtp(newOtp);

      if (callback) {
        callback(newOtp);
      }
    }
  }
  function handleBackspaceAndEnter(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      otpBoxReference.current[index - 1]?.focus();
    }

    if (e.key === "Enter" && otp.join("").length === digits) {
      action?.();
    }
  }
  function handleChange(value: string, index: number) {
    if (value === "" || re.test(value)) {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);
      if (callback !== null) {
        callback(newArr);
      }
      if (value && index < digits - 1) {
        otpBoxReference.current[index + 1].focus();
      }
    }
  }
  return otp.map((digit, index) => (
    <TextField
      onPaste={onPaste}
      key={index}
      value={digit}
      onChange={(e) => handleChange(e.target.value, index)}
      inputRef={(reference) => (otpBoxReference.current[index] = reference)}
      type="text"
      slotProps={{
        input: {
          onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) =>
            handleBackspaceAndEnter(e, index),
        },
        htmlInput: {
          maxLength: 1,
          className: "text-center",
        },
      }}
      className="w-14 h-14 !text-center text-2xl font-extrabold text-hv-color-13 bg-white  hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-hv-color-7 "
    />
  ));
};
