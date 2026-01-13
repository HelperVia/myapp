/**
 * ┌─────────────────────────────────────────────────────────┐
 * │  ██╗  ██╗███████╗██╗     ██████╗ ███████╗██████╗       │
 * │  ██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██╔══██╗      │
 * │  ███████║█████╗  ██║     ██████╔╝█████╗  ██████╔╝      │
 * │  ██╔══██║██╔══╝  ██║     ██╔═══╝ ██╔══╝  ██╔══██╗      │
 * │  ██║  ██║███████╗███████╗██║     ███████╗██║  ██║      │
 * │  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝      │
 * │                     VIA                                  │
 * ├─────────────────────────────────────────────────────────┤
 * │  Developer: Yaşar Demirtaş                              │
 * │  Email: ydemirtas1745@gmail.com                         │
 * │  Hook: useFormActionBar                                 │
 * └─────────────────────────────────────────────────────────┘
 */

import { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";

interface UseFormActionBarOptions {
  watch: UseFormWatch<any>;
  dirtyFields: Record<string, any>;
  isOpenAction: boolean;
  setAction: (action: any) => void;
  resetAction: () => void;
  defaultActionConfig?: any;
}

/**
 * Custom hook to automatically show/hide action bar based on form dirty state
 *
 * @example
 * ```tsx
 * const form = useForm();
 * const { action, setAction, resetAction } = useActionDialog();
 *
 * useFormActionBar({
 *   watch: form.watch,
 *   dirtyFields: form.formState.dirtyFields,
 *   isOpenAction: action.open,
 *   setAction,
 *   resetAction,
 * });
 * ```
 */
export const useFormActionBar = ({
  watch,
  dirtyFields,
  isOpenAction,
  setAction,
  resetAction,
  defaultActionConfig = {},
}: UseFormActionBarOptions) => {
  useEffect(() => {
    const subscription = watch(() => {
      const isDirty = Object.keys(dirtyFields).length > 0;

      if (isDirty && !isOpenAction) {
        setAction({
          open: true,
          ...defaultActionConfig,
        });
      } else if (!isDirty && isOpenAction) {
        resetAction();
      }
    });

    return () => subscription.unsubscribe();
  }, [
    watch,
    dirtyFields,
    isOpenAction,
    setAction,
    resetAction,
    defaultActionConfig,
  ]);
};

export default useFormActionBar;
