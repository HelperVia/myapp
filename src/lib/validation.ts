import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues,
} from "react-hook-form";

export function emailValidation<T extends FieldValues>(
  register: UseFormRegister<T>,
  props?: RegisterOptions<T>,
  registerName = "fullname"
) {
  return register(registerName as Path<T>, {
    required: "Email Address is required",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email address",
    } as any,
    ...props,
  });
}

export function passwordValidation<T extends FieldValues>(
  register: UseFormRegister<T>,
  props?: RegisterOptions<T>,
  registerName = "password"
) {
  return register(registerName as Path<T>, {
    required: "Password is required",
    ...props,
  });
}

export function fullNameValidation<T extends FieldValues>(
  register: UseFormRegister<T>,
  props?: RegisterOptions<T>,
  registerName = "fullname"
) {
  return register(registerName as Path<T>, {
    required: "Full Name is required",
    pattern: {
      value: /[a-zA-Z-ğüşöçİĞÜŞÖÇ]+ [a-zA-Z-ğüşöçİĞÜŞÖÇ]+[a-zA-Z-ğüşöçİĞÜŞÖÇ]$/,
      message: "Invalid Full Name",
    } as any,
    ...props,
  });
}
