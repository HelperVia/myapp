"use client";
import { apiFetch } from "@lib/api/api.fetch";
import Wrapper from "./wrapper";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@store/index";
import { _activeRequests } from "@/shared/lib/api/api.fetch";
import { setAccount } from "@store/user/user.slice";
import { setAllAgents } from "@/store/agent/agent.slice";
import { setConnectionToken } from "@/store/app/app.slice";
import { ApiInitFetchType } from "@/types/api/app/init.fetch.type";
export default function My({ children }: any) {
  const [status, setStatus] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const getInit = async () => {
    const data = await apiFetch<ApiInitFetchType>("/api/app/init", {
      method: "POST",
      body: {},
    });

    setStatus(true);
    if (data?.ok && data?.data?.token) {
      dispatch(setConnectionToken(data?.data?.token));
      dispatch(setAccount(data?.data?.account));
      dispatch(setAllAgents(data?.data?.teams?.agents));
    }
  };

  useEffect(() => {
    getInit();
  }, []);
  if (_activeRequests > 0 || !status) return null;
  return <Wrapper> {children} </Wrapper>;
}
