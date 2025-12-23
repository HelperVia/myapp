"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@store/hooks";
import { SocketContext } from "@context/socket.io/socket.context";

import ConnectionLoading from "@components/loading/connection";
import { ModalProvider } from "@components/ui/modal/ModalProvider";
import { Modal } from "@components/ui/modal/Modal";
import { ActionDialogProvider } from "@components/ui/actionDialog/ActionDialogProvider";
import { Navbar } from "@components/navbar/navbar";
import { Content as LayoutContent } from "@components/layout/content/Content";
import { Notification } from "@components/ui/notification/Notification";

export default function Wrapper({ children }) {
  const selector = useAppSelector((state) => state.app);
  const { connect } = React.use(SocketContext);

  useEffect(() => {
    if (selector?.connection_token) {
      connect();
    }
  }, [selector.connection_token]);

  return (
    <React.Fragment>
      {selector.connection == false && <ConnectionLoading />}
      {selector.connection == true && (
        <ModalProvider>
          <ActionDialogProvider>
            <Notification />
            <Modal />
            <div className="main-wrapper flex h-[100vh] overflow-hidden flex-col md:flex-row ">
              <Navbar />
              <LayoutContent>{children}</LayoutContent>
            </div>
          </ActionDialogProvider>
        </ModalProvider>
      )}
    </React.Fragment>
  );
}
