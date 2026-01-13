import { ActionDialogContext } from "@/components/ui/actionDialog";
import { useMemo, useContext } from "react";
import { useDeviceDetect } from "@shared/hooks/use-device-detect";

interface LayoutHeights {
  DESKTOP_HEADER: number;
  ACTION_PANEL: number;
  MOBILE_NAVBAR: number;
}

interface UseLayoutHeightReturn {
  containerHeight: string;
  heightOffset: number;
}

const HEIGHTS: LayoutHeights = {
  DESKTOP_HEADER: 0,
  ACTION_PANEL: 78,
  MOBILE_NAVBAR: 64,
};

export const useLayoutHeight = (): UseLayoutHeightReturn => {
  const { open: isActionDialogOpen } = useContext(ActionDialogContext);
  const { isMobile } = useDeviceDetect();

  const heightOffset = useMemo((): number => {
    const panelHeight = isActionDialogOpen ? HEIGHTS.ACTION_PANEL : 0;
    const navbarHeight = isMobile ? HEIGHTS.MOBILE_NAVBAR : 0;
    return panelHeight + navbarHeight;
  }, [isActionDialogOpen, isMobile]);

  const containerHeight: string = `calc(100vh - ${heightOffset}px)`;

  return { containerHeight, heightOffset };
};
