import * as React from "react";

export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;

export function useResponsiveScreen() {
  const [screen, setScreen] = React.useState({
    isMobile: false,
    isTablet: false,
  });

  React.useEffect(() => {
    const updateScreen = () => {
      const width = window.innerWidth;
      setScreen({
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
      });
    };

    updateScreen(); // Initial check
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  return screen;
}