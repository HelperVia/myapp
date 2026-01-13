"use client";
import "./globals.css";
import "@public/app.scss";
import "./app.scss";
import React, { Suspense, useEffect } from "react";
import Loading from "@components/loading/initialize";

import GlobalLoadingProvider from "@shared/context/api.loading/global.loading.provider";
import { SessionProvider } from "next-auth/react";
export default function Bootstrap({ children }: any) {
  return (
    <Suspense fallback={<Loading />}>
      <SessionProvider>
        <GlobalLoadingProvider LoadingComponent={<Loading />}>
          {children}
        </GlobalLoadingProvider>
      </SessionProvider>
    </Suspense>
  );
}
