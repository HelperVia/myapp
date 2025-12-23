"use client";
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/app";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
    },
  });
};
