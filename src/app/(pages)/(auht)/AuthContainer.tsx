"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Logout } from "@actions/auth/logout";
type AuthContainerProps = {
  bg_color?: string;
  back_login?: boolean;
  children: ReactNode;
};
export const AuthContainer = (props: AuthContainerProps) => {
  const { bg_color = false, back_login = false, children = null } = props;
  const router = useRouter();

  const LogOut = async () => {
    const response = await Logout();
    if (response) {
      router.push("/login");
    }
  };

  return (
    <div
      className={
        "auth-form min-h-screen h-[100%] p-0 m-0 flex flex-col " +
        (bg_color ? "bg-" + bg_color : "bg-bg-color-1")
      }
    >
      <div className=" top-0  left-0 h-[80px] w-[100%]  flex justify-between items-center pt-0 pl-[20px] pr-[20px]">
        {!back_login && <div className="flex w-[20%] items-center"></div>}
        <div className={!back_login ? "grow-[1]" : ""}>
          <a className="flex justify-center items-center"></a>
        </div>
        <div className={"items-center " + (!back_login ? "flex w-[20%]" : "")}>
          {back_login && (
            <button
              onClick={LogOut}
              className="text-hv-color-8 text-[15px] flex justify-center items-center"
            >
              Login / Signup
            </button>
          )}
        </div>
      </div>

      {children}

      <div className="mt-auto bg-white mt-0 pt-[20px] pb-[20px] pl-[6px] pr-[6px] border-[1px] border-solid border-hv-color-1">
        <div className="text-center">
          <p className="auth-footer-text">
            © {new Date().getFullYear()} HelperVia. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
