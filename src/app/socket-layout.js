"use client";

import SocketProvider from "@context/socket.io/socket.provider";

import React, { useState, useEffect, Suspense } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "@store/hooks";
import Cookies from "js-cookie";
import Loading from "./loading";

export default function SocketLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const store = useAppStore();
  useEffect(() => {
    setIsLoading(false);
    let rs = Cookies.get(process.env.NEXT_PUBLIC_APP_PREFIX + "_rs");
    if (typeof rs !== "undefined") {
      rs = JSON.parse(rs);
      if (typeof rs.authentication !== "undefined") {
        store.dispatch({
          type: "AUTHENTICATION",
          data: rs.authentication,
        });

        if (typeof rs.license_number !== "undefined") {
          store.dispatch({
            type: "SET_LICENSE_NUMBER",
            data: rs.license_number,
          });
        }

        if (rs.authentication === true) {
          if (typeof rs.starter !== "undefined") {
            store.dispatch({
              type: "SET_STARTER",
              data: rs.starter,
            });
            if (typeof rs.companies !== "undefined") {
              store.dispatch({
                type: "SET_COMPANY",
                data: rs.companies,
              });
            }
            if (typeof rs.full_name !== "undefined") {
              store.dispatch({
                type: "SET_AGENT_NAME",
                data: rs.full_name,
              });
            }
            store.dispatch({
              type: "VERIFICATION",
              data: rs.email_verification,
            });
            if (typeof rs.configuration_step !== "undefined") {
              store.dispatch({
                type: "SET_STEP",
                data: rs.configuration_step,
              });
            }
          }
          if (typeof rs.departments !== "undefined") {
            store.dispatch({
              type: "SET_ALL_DEPARTMENTS",
              data: rs.departments,
            });
          }

          if (typeof rs.token !== "undefined") {
            store.dispatch({
              type: "SET_BEARER",
              data: rs.token,
            });
          }

          if (typeof rs.active_chats !== "undefined") {
            store.dispatch({
              type: "SET_ACTIVE_CHAT",
              data: rs.active_chats,
            });
          }
          if (typeof rs.cannedResponse !== "undefined") {
            store.dispatch({
              type: "SET_CANNED_RESPONSE",
              data: rs.cannedResponse,
            });
          }
          if (typeof rs.settings !== "undefined") {
            store.dispatch({
              type: "SET_SETTINGS",
              data: rs.settings,
            });
          }

          if (typeof rs.operator !== "undefined") {
            store.dispatch({
              type: "SET_OPERATOR",
              data: rs.operator,
            });
          }

          store.dispatch({
            type: "SET_PROCESS",
            data: true,
          });
        }
      }
    }
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      {!isLoading && <SocketProvider>{children}</SocketProvider>}
      {isLoading && <Loading />}
    </Suspense>
  );
}
