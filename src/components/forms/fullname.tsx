import { TextField, TextFieldProps, TextFieldSize } from "@components/ui/forms";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { fullNameValidation } from "@lib/validation";
import {
  UseFormRegister,
  UseFormTrigger,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import { ChangeEvent } from "react";

type FullNameFieldProps<T extends FieldValues> = {
  register?: UseFormRegister<T>;
  trigger?: UseFormTrigger<T>;
  errors?: FieldErrors<T>;
  name?: string;
} & TextFieldProps;

export const FullName = <T extends FieldValues>(
  props: FullNameFieldProps<T>
) => {
  const { trigger, register, errors, name = "fullname" } = props;

  const onChangeName = async (e: ChangeEvent<HTMLInputElement>) => {
    await trigger?.();
    props?.onChange?.(e);
  };
  const onBlurName = async (e: ChangeEvent<HTMLInputElement>) => {
    await trigger?.();
  };

  return (
    <TextField
      {...props}
      {...(register
        ? fullNameValidation(
            register,
            {
              onChange: (e) => {
                onChangeName(e).then(() => {});
              },
              onBlur: (e) => {
                onBlurName(e).then(() => {});
              },
            },
            name
          )
        : {})}
      autoComplete={name}
      name={name}
      error={
        typeof errors?.[name]?.message === "string"
          ? errors?.[name].message
          : undefined
      }
      startAdornment={<PersonOutlineOutlinedIcon />}
    />
  );
};
