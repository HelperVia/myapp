import { useState, useEffect } from "react";
import {
  isMobile as isInitialMobile,
  isTablet,
  isDesktop,
} from "react-device-detect";

interface DeviceDetect {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useDeviceDetect = (): DeviceDetect => {
  const [isMobile, setIsMobile] = useState<boolean>(isInitialMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = (e: MediaQueryListEvent): void => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
};
