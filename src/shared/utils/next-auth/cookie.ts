import { CookiesOptions, CookieOption } from "next-auth";

type createAuthCookiesType = {
  prefix?: string;
  sessionToken?: CookieOption;
  callbackUrl?: CookieOption;
  csrfToken?: CookieOption;
  pkceCodeVerifier?: CookieOption;
  state?: CookieOption;
  nonce?: CookieOption;
};

export const createAuthCookies = (
  props: createAuthCookiesType = {}
): CookiesOptions => {
  const {
    prefix = process.env.NEXT_PUBLIC_APP_PREFIX,
    sessionToken,
    callbackUrl,
    csrfToken,
    pkceCodeVerifier,
    state,
    nonce,
  } = props;
  return {
    sessionToken: sessionToken ?? {
      name: `${prefix}-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    callbackUrl: callbackUrl ?? {
      name: `${prefix}.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    csrfToken: csrfToken ?? {
      name: `${prefix}.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    pkceCodeVerifier: pkceCodeVerifier ?? {
      name: `${prefix}.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        maxAge: 900,
      },
    },
    state: state ?? {
      name: `${prefix}.state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        maxAge: 900,
      },
    },
    nonce: nonce ?? {
      name: `${prefix}.nonce`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  };
};
