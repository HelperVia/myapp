import { Alert, InputAdornment, TextField } from "@mui/material";
import { emailValidation } from "@lib/validation";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  UseFormTrigger,
  FieldErrors,
  UseFormRegister,
  Path,
} from "react-hook-form";

type EmailProps<T extends { email: string }> = {
  register?: UseFormRegister<T>;
  trigger?: UseFormTrigger<T>;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  errors?: FieldErrors<T>;
  disabled?: boolean;
};
export const Email = <T extends { email: string }>(props: EmailProps<T>) => {
  const { register, trigger, setValue, value, errors, disabled } = props;

  const onChange = async (value: string) => {
    await trigger?.("email" as Path<T>);
    setValue?.(value.trim());
  };
  return (
    <TextField
      {...(register
        ? emailValidation(register, {
            onChange: (e) => onChange(e.target.value),
          })
        : { onChange: (e) => onChange(e.target.value) })}
      value={value}
      name="email"
      autoComplete="email"
      fullWidth
      autoFocus={false}
      disabled={disabled}
      placeholder="Eg. agent@example.com"
      size="small"
      error={Boolean(errors?.email)}
      helperText={
        typeof errors?.email?.message === "string"
          ? errors.email.message
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
              <EmailOutlinedIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
