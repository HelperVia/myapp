"use client";
import React, { useEffect, useState } from "react";
import { AuthContainer } from "../AuthContainer";
import AuthStep from "../auth-step";
import AuthStepItem from "../auth-step-item";
import { fullNameValidation } from "@lib/validation";

import { useForm } from "react-hook-form";

import { InputAdornment, TextField } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Button from "@mui/material/Button";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { ApiResponse } from "@shared/lib/api/response/api.response.client";

const UserSettings = () => {
  const [nameValue, setName] = useState("");
  const {
    register,
    trigger,
    setError,
    watch,
    getFieldState,
    setValue,
    formState: { errors },
  } = useForm();
  const [error, setErrorAction] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeName = async (value) => {
    setName(value);
  };
  const onBlurName = async (value) => {
    setName(value.trim());
    setValue("firstLastName", value.trim(), { shouldValidate: true });
    await trigger();
  };
  const setNameAction = async () => {
    setValue("firstLastName", nameValue.trim(), { shouldValidate: true });
    await trigger();
    if (!getFieldState("firstLastName").error) {
      setLoading(true);

      const response = await fetch("/api/starter/settings/save", {
        method: "POST",
        body: JSON.stringify({
          name: nameValue,
        }),
      });
      const data = await ApiResponse(response);

      if (data?.ok) {
        window.location.reload();
      }

      if (!data?.ok) {
        setErrorAction(data?.error);
      }
    }
  };

  return (
    <AuthContainer bg_color="hv-color-12" back_login={true}>
      <div className="pl-[16px] pr-[16px] flex items-center justify-center flex-col">
        <div className="w-[320px] p-[20px]">
          <div className=" w-[100%] mt-0 ml-auto mr-auto mb-[20px] text-center">
            <h2>Hey There 👋</h2>
            <p className="mt-4 text-[.9rem] text-hv-color-2">
              There is one last step left to use HelperVia.
            </p>
          </div>

          <div className="mb-[.75rem]">
            <div className="relative text-[1rem] box-border">
              <TextField
                {...fullNameValidation(register, {
                  onChange: (e) => {
                    onChangeName(e.target.value).then(() => {});
                  },
                  onBlur: (e) => {
                    if (!e.relatedTarget) {
                      onBlurName(e.target.value).then(() => {});
                    }
                  },
                })}
                autoFocus
                value={nameValue}
                fullWidth
                placeholder="First Last Name"
                size="small"
                error={Boolean(errors.firstLastName)}
                helperText={
                  errors.firstLastName && errors.firstLastName.message
                }
                sx={{
                  "&.MuiInputBase-root": {
                    color: "currentColor",
                  },
                }}
                slotProps={{
                  htmlInput: {
                    className: "!text-hv-color-3 border-none",
                  },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
          </div>

          <div className="">
            <Button
              color="brandOrange"
              variant="outlined"
              fullWidth
              onClick={setNameAction}
              className="justify-between!"
              loading={loading}
              endIcon={<KeyboardArrowRightOutlinedIcon />}
            >
              Save & Complete
            </Button>
          </div>
        </div>
        <AuthStep>
          <AuthStepItem
            title="Register"
            label="1"
            description="Sign up using your email address"
          />
          <AuthStepItem
            title="User Settings"
            label="2"
            active={true}
            description="adjust your user settings"
          />
          <AuthStepItem
            title="Completed"
            label="3"
            description="Complete your membership and access all your linked companies"
          />
        </AuthStep>
      </div>
    </AuthContainer>
  );
};

export default UserSettings;
