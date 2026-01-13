import { TextField, TextFieldProps, TextFieldSize } from "@components/ui/forms";
import { passwordValidation } from "@lib/validation";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormTrigger,
} from "react-hook-form";

type PasswordFieldProps<T extends FieldValues> = {
  register?: UseFormRegister<T>;
  trigger?: UseFormTrigger<T>;
  errors?: FieldErrors<T>;
  name?: string;
} & TextFieldProps;

export const Password = <T extends FieldValues>(
  props: PasswordFieldProps<T>
) => {
  const { trigger, register, errors, name = "password" } = props;

  const onChange = async (value: string) => {
    await trigger?.(name as Path<T>);
  };
  return (
    <TextField
      {...props}
      {...(register
        ? passwordValidation(
            register,
            {
              onChange: (e) => onChange(e.target.value),
            },
            name
          )
        : {})}
      type="password"
      name={name}
      placeholder="******"
      error={
        typeof errors?.[name]?.message === "string"
          ? errors?.[name].message
          : undefined
      }
      startAdornment={<HttpsOutlinedIcon />}
    />
  );
};
