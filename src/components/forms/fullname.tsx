import { InputAdornment, TextField } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { fullNameValidation } from "@lib/validation";
import { UseFormRegister, UseFormTrigger, FieldErrors } from "react-hook-form";

type fullNameType<T extends { fullname: string }> = {
  register?: UseFormRegister<T>;
  trigger?: UseFormTrigger<T>;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
  errors?: FieldErrors<T>;
};

export const FullName = <T extends { fullname: string }>(
  props: fullNameType<T>
) => {
  const { trigger, register, setValue, value, errors } = props;

  const onChangeName = async (value: string) => {
    await trigger?.();
    setValue?.(value);
  };
  const onBlurName = async (value: String) => {
    await trigger?.();
    setValue?.(value.trim());
  };

  return (
    <TextField
      {...(register
        ? fullNameValidation(register, {
            onChange: (e) => {
              onChangeName(e.target.value).then(() => {});
            },
            onBlur: (e) => {
              onBlurName(e.target.value).then(() => {});
            },
          })
        : {})}
      autoComplete="fullname"
      name="fullname"
      autoFocus
      value={value}
      fullWidth
      placeholder="Full Name"
      size="small"
      error={Boolean(errors?.fullname)}
      helperText={
        typeof errors?.fullname?.message === "string"
          ? errors.fullname.message
          : undefined
      }
      sx={{
        ".MuiInputBase-root": {
          color: "currentColor",
          height: "50px",
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
  );
};
