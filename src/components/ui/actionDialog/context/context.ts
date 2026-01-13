import { createContext } from "react";

export interface DialogButton {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}
// Context state
export interface ActionDialogState {
  open?: boolean;
  saveLoading?: boolean;
  cancel?: DialogButton;
  save?: DialogButton;
}

// Context actions / updater
export type ActionDialogActions = {
  setAction: (action: Partial<ActionDialogState>) => void;
  updateAction: (action: Partial<ActionDialogState>) => void;
  resetAction: () => void;
};

export type ActionDialogContextType = ActionDialogState & ActionDialogActions;

export const ActionDialogContext = createContext<ActionDialogContextType>({
  open: false,
  saveLoading: false,
  setAction: (action) => {},
  resetAction: () => {},
  updateAction: (action) => {},
});
