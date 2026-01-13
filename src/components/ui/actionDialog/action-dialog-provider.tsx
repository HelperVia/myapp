import React, { useState, ReactNode } from "react";
import { ActionDialogContext, ActionDialogState } from "./index";

interface ActionDialogProviderProps {
  children: ReactNode;
}

export const ActionDialogProvider: React.FC<ActionDialogProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<ActionDialogState>({
    open: false,
    saveLoading: false,
  });

  const setAction = (action: Partial<ActionDialogState>) => {
    setState(action);
  };
  const updateAction = (action: Partial<ActionDialogState>) => {
    setState((prev) => {
      const newState = { ...prev };

      // deep merge
      if (action.save !== undefined) {
        newState.save = {
          ...prev.save,
          ...action.save,
        };
      }

      if (action.cancel !== undefined) {
        newState.cancel = {
          ...prev.cancel,
          ...action.cancel,
        };
      }

      if (action.open !== undefined) {
        newState.open = action.open;
      }
      if (action.saveLoading !== undefined) {
        newState.saveLoading = action.saveLoading;
      }

      return newState;
    });
  };
  const resetAction = () => {
    setState({});
  };
  return (
    <ActionDialogContext.Provider
      value={{ ...state, setAction, resetAction, updateAction }}
    >
      {children}
    </ActionDialogContext.Provider>
  );
};
