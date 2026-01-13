import { TextField, TextFieldProps } from "@components/ui/forms";
import { emailValidation } from "@lib/validation";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  UseFormTrigger,
  FieldErrors,
  UseFormRegister,
  Path,
  FieldValues,
} from "react-hook-form";

type EmailFieldProps<T extends FieldValues> = {
  register?: UseFormRegister<T>;
  trigger?: UseFormTrigger<T>;
  errors?: FieldErrors<T>;
  name?: string;
} & TextFieldProps;

export const Email = <T extends FieldValues>(props: EmailFieldProps<T>) => {
  const { register, trigger, errors, name = "email" } = props;

  const onChangeEmail = async (e: any) => {
    await trigger?.(name as Path<T>);
    props?.onChange?.(e);
  };
  const onBlurEmail = async (e: any) => {
    await trigger?.(name as Path<T>);
    props?.onBlur?.(e);
  };

  return (
    <TextField
      {...props}
      {...(register
        ? emailValidation(
            register,
            {
              onChange: (e) => onChangeEmail(e),
              onBlur: (e) => onBlurEmail(e),
            },
            name
          )
        : {})}
      autoComplete={name}
      name={name}
      placeholder={props?.placeholder ?? "E.g. agent@example.com"}
      error={
        typeof errors?.[name]?.message === "string"
          ? errors?.[name].message
          : undefined
      }
      startAdornment={<EmailOutlinedIcon />}
    />
  );
};
