"use client";
import React, { useContext, useEffect } from "react";
import { ActionDialogContext } from "./context/context";
import Button from "@components/ui/Button";

export const ActionDialog = () => {
  const { open, cancel, save, saveLoading, setAction } =
    useContext(ActionDialogContext);

  const cancelAction = () => {
    if (cancel?.disabled !== true) {
      cancel?.onClick?.();
      setAction({ open: false });
    }
  };

  const saveAction = () => {
    if (save?.disabled !== true) {
      save?.onClick?.();
    }
  };

  return (
    <div
      className={`
        fixed bottom-0 w-full z-[1300]
        bg-secondary-500
        border-t border-secondary-600
        shadow-[0_-4px_12px_rgba(0,0,0,0.15)]
        transform transition-transform duration-300 ease-out
        ${open ? "translate-y-0" : "translate-y-full"}
        ${!open && "pointer-events-none"}
      `}
      role="dialog"
      aria-hidden={!open}
    >
      <div className="w-full flex justify-center items-center h-[78px] px-6">
        <div className="flex flex-row gap-3 min-w-[220px]">
          <Button
            variant="secondary-light"
            onClick={cancelAction}
            loading={saveLoading}
            disabled={cancel?.disabled ? true : false}
          >
            {cancel?.label ?? "Cancel"}
          </Button>
          <Button
            loading={saveLoading}
            disabled={save?.disabled ? true : false}
            variant="primary"
            onClick={saveAction}
          >
            {saveLoading ? "Saving..." : save?.label ?? "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};
