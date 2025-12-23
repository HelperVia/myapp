import { UseFormRegister, RegisterOptions, Path } from "react-hook-form";

export function emailValidation<T extends { email: string }>(
  register: UseFormRegister<T>,
  props?: RegisterOptions<T>
) {
  return register("email" as Path<T>, {
    required: "Email Address is required",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email address",
    } as any,
    ...props,
  });
}

export function passwordValidation<T extends { password: string }>(
  register: UseFormRegister<T>,
  props?: RegisterOptions<T>
) {
  return register("password" as Path<T>, {
    required: "Password is required",
    ...props,
  });
}

export function fullNameValidation<T extends { fullname: string }>(
  register: UseFormRegister<T>,
  props?: RegisterOptions<T>
) {
  return register("fullname" as Path<T>, {
    required: "Full Name is required",
    pattern: {
      value: /[a-zA-Z-ğüşöçİĞÜŞÖÇ]+ [a-zA-Z-ğüşöçİĞÜŞÖÇ]+[a-zA-Z-ğüşöçİĞÜŞÖÇ]$/,
      message: "Invalid Full Name",
    } as any,
    ...props,
  });
}
