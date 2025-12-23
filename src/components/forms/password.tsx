import { Alert, InputAdornment, TextField } from "@mui/material";
import { passwordValidation } from "@lib/validation";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import {
  FieldErrors,
  Path,
  UseFormRegister,
  UseFormTrigger,
} from "react-hook-form";
type PasswordValues<T extends { password: string }> = {
  register?: UseFormRegister<T>;
  trigger?: UseFormTrigger<T>;
  errors?: FieldErrors<T>;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
  disabled?: boolean;
};
export const Password = <T extends { password: string }>(
  props: PasswordValues<T>
) => {
  const {
    trigger,
    register,
    errors,
    setValue,
    value,
    disabled = false,
  } = props;

  const onChange = async (value: string) => {
    await trigger?.("password" as Path<T>);

    setValue?.(value.trim());
  };
  return (
    <TextField
      {...(register
        ? passwordValidation(register, {
            onChange: (e) => onChange(e.target.value),
          })
        : { onChange: (e) => onChange(e.target.value) })}
      type="password"
      name="password"
      defaultValue={value}
      disabled={disabled}
      fullWidth
      placeholder="******"
      size="small"
      error={Boolean(errors?.password)}
      helperText={
        typeof errors?.password?.message === "string"
          ? errors.password.message
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
          className: "!text-hv-color-3",
        },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <HttpsOutlinedIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
