import { useEffect, useState } from "react";

type screenTypeProp = "desktop" | "tablet" | "phone";

interface viewportHookValues {
  viewportWidth: number;
  viewportHeight: number;
  screenType: screenTypeProp;
}

const getScreenType = (viewportWidth: number): screenTypeProp => {
  if (viewportWidth >= 786) return "desktop";
  if (viewportWidth >= 500) return "tablet";
  return "phone";
};

export function useViewportWidth(): viewportHookValues {
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(
    () => window.innerHeight
  );
  const [screenType, setScreenType] = useState(() =>
    getScreenType(window.innerWidth)
  );

  useEffect(() => {
    const onResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      setScreenType(getScreenType(window.innerWidth));
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { viewportWidth, viewportHeight, screenType };
}
