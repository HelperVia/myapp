"use client";
import React, { useState, useEffect, JSX } from "react";

import {
  setGlobalLoaderSetter,
  setUpdateActiveRequest,
  _updateLoadingState,
  decrementActiveRequests,
} from "@shared/lib/api/api.fetch";

import { GlobalLoadingContext } from "./global.loading.context";
import { usePathname } from "next/navigation";
type Props = {
  children: JSX.Element;
  LoadingComponent: React.ReactNode;
};
export default function GlobalLoadingProvider({
  children,
  LoadingComponent,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    decrementActiveRequests();
  }, [pathname]);

  useEffect(() => {
    setGlobalLoaderSetter(setLoading);
    setReady(true);
    setUpdateActiveRequest(0);
    return () => {
      setGlobalLoaderSetter(() => {});
    };
  }, []);

  if (!ready) return null;
  return (
    <GlobalLoadingContext.Provider value={loading}>
      {loading && (LoadingComponent ?? <div>Loading...</div>)}
      {children}
    </GlobalLoadingContext.Provider>
  );
}
