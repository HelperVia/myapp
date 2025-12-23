"use client";
import { configureStore } from "@reduxjs/toolkit";
import agentReducer from "./agent/agent.slice";
import userReducer from "./user/user.slice";
import appReducer from "./app/app.slice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      agent: agentReducer,
      user: userReducer,
      app: appReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
